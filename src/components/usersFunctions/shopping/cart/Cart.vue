<template>
  <div class="cart-page">
    <h1>Корзина</h1>
    <div v-if="cartItems.length" class="cart-items">
      <div class="cart-header">
        <span>Обложка</span>
        <span>Название</span>
        <span>Жанры</span>
        <span>Цена</span>
        <span>Количество</span>
        <span>Итого</span>
        <span>Действие</span>
      </div>

      <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
        <div class="cart-cell">
          <span class="field-label"></span>
          <img :src="item.image" alt="Обложка книги" class="book-image"/>
        </div>
        <div class="cart-cell">
          <span class="field-label"></span>
          <h3>{{ item.title }}</h3>
        </div>
        <div class="cart-cell">
          <span class="field-label">Жанры:</span>
          <p>{{ this.getGenre( item.genre) }}</p>
        </div>
        <div class="cart-cell">
          <span class="field-label">Цена:</span>
          <p>{{ item.price }}$</p>
        </div>
        <div class="cart-cell quantity-controls">
          <span class="field-label">Количество:</span>
          <button @click="changeQuantity(index, -1)" :disabled="item.quantity <= 1">-</button>
          <input type="number" v-model.number="item.quantity" min="1" @change="updateQuantity(index)" @keydown.prevent/>
          <button @click="changeQuantity(index, 1)">+</button>
        </div>
        <div class="cart-cell">
          <span class="field-label">Итого:</span>
          <p>{{ (item.price * item.quantity).toFixed(2) }}$</p>
        </div>
        <div class="cart-cell">
          <span class="field-label"></span>
          <button @click="removeItem(index)" class="remove-button">Удалить</button>
        </div>
      </div>


      <div class="cart-summary">
        <h2>Общая стоимость: {{ totalAmount.toFixed(2) }}$</h2>
        <button class="checkout-button" @click="checkout">Оформить заказ</button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Ваша корзина пуста</p>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import logo from "@/assets/books/logo1.png";

export default {
  data() {
    return {
      cartItems: [],
      genreMapping: {
        NO_GENRE: "Без жанра",
        FANTASY: "Фантастика",
        SCIENCE_FICTION: "Научная фантастика",
        ROMANCE: "Романтика",
        MYSTERY: "Детектив",
        HORROR: "Ужасы",
        THRILLER: "Триллер",
        HISTORICAL: "Исторический",
        CHILDREN: "Детская литература",
        YOUNG_ADULT: "Молодежная литература"
      }
    };
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  mounted() {
    this.getCartItems();
    if(localStorage.getItem('jwt') == null){
      this.$router.push(`/api/v1/bookstore`);
    }
  },
  watch: {
    cartItems: {
      handler(newValue) {
        newValue.forEach((item) => {
              if (item.quantity > 0) {
                this.syncCartItemQuantity(item);
              }
            }
        );
        this.updateTotalPrice();
        console.log(localStorage.getItem('price'))
      },
      deep: true,
    },

  },
  methods: {
    getGenre(genre) {
      return this.genreMapping[genre] || genre; // если жанр не найден в объекте, возвращаем сам жанр
    },
    async updateTotalPrice() {
      const totalPrice = this.totalAmount.toFixed(2).toString(); // Получаем общую сумму
      localStorage.setItem('price', totalPrice);
    },
    async syncCartItemQuantity(item) {
      try {
        const token = localStorage.getItem('jwt');
        let code = item.code
        console.log(item.quantity)
        let quantity = item.quantity
        console.log(quantity)
        const response = await axios.post(
            `http://${this.$ComputerIP}/api/v1/cart/changeQuantity`,
            {
              cartItemCode: code,
              quantity: quantity
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        console.log(response)
        if (response.data.message === "Too much") {
          item.quantity -= 1
        }
      } catch (error) {
        console.error("Ошибка синхронизации количества:", error.message);
      }
    },
    async getCartItems() {
      try {
        const token = localStorage.getItem('jwt')
        const response = await axios.get(`http://${this.$ComputerIP}/api/v1/cart/getItemList`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && response.data.responseEntity) {
          console.log(response)
          this.cartItems = response.data.responseEntity.listBookDto.map(bookDto => ({
            title: bookDto.bookName,
            price: bookDto.bookPrice,
            genre: bookDto.bookGenre,
            code: bookDto.itemCode,
            image: this.byteArrayToBase64(bookDto.image),
            quantity: bookDto.itemQuantity
          }));
          localStorage.setItem("books", JSON.stringify(this.books)); // Сохраняем данные в localStorage
        } else {
          this.errorMessage = "Книги не найдены!";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Ошибка на сервере.";
        } else {
          console.error("Ошибка в процессе загрузки книг:", error.message);
          this.errorMessage = "Произошла ошибка при загрузке данных.";
        }
      }
    },
    updateQuantity(index) {
      if (this.cartItems[index].quantity < 1) {
        this.cartItems[index].quantity = 1;
      }
    },
    changeQuantity(index, delta) {
      const newQuantity = this.cartItems[index].quantity + delta;
      if (newQuantity > 0) {
        this.cartItems[index].quantity = newQuantity;
        this.updateQuantity(index);
      }
    },
    async removeItem(index) {
      try {
        const token = localStorage.getItem('jwt')
        const item = this.cartItems[index];
        console.log(item.code)
        let code = item.code
        const response = await axios.post(`http://${this.$ComputerIP}/api/v1/cart/delFromCart`, {
          cartItemCode: code
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && response.data.responseEntity) {
          console.log(response)
          this.cartItems.splice(index, 1);
        } else {
          this.errorMessage = "Книга не найдены!";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Ошибка на сервере.";
        } else {
          console.error("Ошибка в процессе удаления книг:", error.message);
          this.errorMessage = "Произошла ошибка при удаление данных.";
        }
      }

    },
    byteArrayToBase64(base64String) {
      if (!base64String) {
        return logo;
      }

      return `data:image/png;base64,${base64String}`;
    },
    async checkout() {
      this.$router.push('/api/v1/bookstore/order');

    },
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 100%;
  padding: 20px;
  margin-top: 84px;
  font-family: Arial, sans-serif;
}

.cart-items {
  border-top: 1px solid #ccc;
  margin-top: 20px;
}

.cart-header {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 80px 150px 100px 100px;
  gap: 10px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr 1fr 80px 150px 100px 100px;
  gap: 10px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;

}

.cart-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

}

.book-image {

  width: 60px;
  height: 90px;
  object-fit: cover;
}

.quantity-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.quantity-controls button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.quantity-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.cart-summary {
  text-align: center;
  margin-top: 20px;
}

.checkout-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
}

.empty-cart {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
.cart-item .field-label {
  display: none;
}

@media (max-width: 768px) {
  .cart-page{
    margin-top: 270px;
  }
  .cart-header {
    display: none;
  }
  .cart-item .field-label {
    display: grid;
  }
  .cart-item {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 15px;

  }
  .field-label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
  }

  .cart-item {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 15px;
  }

  .cart-cell {
    justify-content: flex-start;
    text-align: left;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-cell img {
    margin: 0 auto;
  }
  .cart-cell {
    justify-content: flex-start;
    text-align: left;
  }
  .quantity-controls {
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
  .cart-cell img {
    margin: 0 auto;
  }
}
</style>

