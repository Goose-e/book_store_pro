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
          <img :src="item.image" alt="Обложка книги" class="book-image"/>
        </div>
        <div class="cart-cell">
          <h3>{{ item.title }}</h3>
        </div>
        <div class="cart-cell">
          <p>{{ item.genre }}</p>
        </div>
        <div class="cart-cell">
          <p>{{ item.price }} руб.</p>
        </div>
        <div class="cart-cell quantity-controls">
          <button @click="decreaseQuantity(index)" :disabled="item.quantity <= 1">-</button>
          <input type="number" v-model.number="item.quantity" min="1" @change="updateQuantity(index)"/>
          <button @click="increaseQuantity(index)">+</button>
        </div>
        <div class="cart-cell">
          <p>{{ (item.price * item.quantity).toFixed(2) }} руб.</p>
        </div>
        <div class="cart-cell">
          <button @click="removeItem(index)" class="remove-button">Удалить</button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Общая стоимость: {{ totalAmount.toFixed(2) }} руб.</h2>
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
    };
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  mounted() {
    this.getCartItems();
  },
  watch: {
    cartItems: {
      handler(newValue) {
        newValue.forEach((item) => {
          if (item.quantity > 0) {
            this.syncCartItemQuantity(item);
          }
        });
      },
      deep: true,
    },

  },
  methods: {
    async syncCartItemQuantity(item) {
      try {
        const token = localStorage.getItem('jwt');
        let code = item.code
        console.log(item.quantity)
        let quantity = item.quantity
        console.log(quantity)
        const response = await axios.post(
            `http://localhost:8080/api/v1/cart/changeQuantity`,
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
          alert("Больше нет на складе")
        }
      } catch (error) {
        console.error("Ошибка синхронизации количества:", error.message);
      }
    },
    async getCartItems() {
      try {
        const token = localStorage.getItem('jwt')
        const response = await axios.get("http://localhost:8080/api/v1/cart/getItemList", {
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
    increaseQuantity(index) {
      this.cartItems[index].quantity += 1;
      console.log( this.cartItems[index].quantity)
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity -= 1;
      }
    },
    updateQuantity(index) {
      if (this.cartItems[index].quantity < 1) {
        this.cartItems[index].quantity = 1;
      }
    },
    async removeItem(index) {
      try {
        const token = localStorage.getItem('jwt')
        const item = this.cartItems[index];
        console.log(item.code)
        let code = item.code
        const response = await axios.post("http://localhost:8080/api/v1/cart/delFromCart", {
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
    checkout() {
      alert('Заказ оформлен!');
      this.cartItems = [];
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

/* Адаптивность */
@media (max-width: 768px) {
  .cart-header {
    display: none;
  }

  .cart-item {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 15px;
  }

  .cart-cell {
    justify-content: flex-start;
    text-align: left;
  }

  .cart-cell img {
    margin: 0 auto;
  }
}
</style>

