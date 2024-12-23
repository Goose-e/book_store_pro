<template>
  <div class="cart-page">
    <h1>Заказ</h1>
    <div v-if="authority === 'ADMIN'" class="status-button" @click="changeOrderStatus">
      <button v-if="this.orderStatus === 'ORDER_ACTUAL'" class="close-order">
        Закрыть заказ
      </button>
      <button v-else class="open-order">
        Открыть заказ
      </button>
    </div>
    <div v-if="orderItems.length" class="cart-items">
      <div class="cart-header">
        <span>Обложка</span>
        <span>Название</span>
        <span>Жанры</span>
        <span>Цена</span>
        <span>Количество</span>
        <span>Итого</span>
      </div>

      <div class="cart-item" v-for="(item, index) in orderItems" :key="item.id">
        <div class="cart-cell">
          <span class="field-label"></span>
          <img :src="item.image" alt="Обложка книги" class="book-image"/>
        </div>
        <div class="cart-cell">
          <span class="field-label"></span>
          <h3>{{ item.title }}</h3>
        </div>
        <div class="cart-cell">
          <span class="field-label">Жанр:</span>
          <p>{{ this.getGenre(item.genre) }}</p>
        </div>
        <div class="cart-cell">
          <span class="field-label">Цена:</span>
          <p>{{ item.price }}$</p>
        </div>
        <div class="cart-cell quantity-controls">
          <span class="field-label">Количество:</span>
          <p>{{ item.quantity }}</p>
        </div>
        <div class="cart-cell">
          <span class="field-label">Итого:</span>
          <p>{{ (item.price * item.quantity).toFixed(2) }}$</p>
        </div>
      </div>


      <div class="cart-summary">
        <h2>Общая стоимость: {{ totalAmount.toFixed(2) }}$</h2>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Ваша заказ пуст</p>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import logo from "@/assets/books/logo1.png";

export default {
  data() {
    return {
      orderItems: [],
      authority: localStorage.getItem('authority'),
      orderStatus: '',
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
      },
    };
  },
  computed: {
    totalAmount() {
      return this.orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  mounted() {
    this.getOrderItems();
    if (localStorage.getItem('jwt') == null) {
      this.$router.push(`/api/v1/bookstore`);
    }
  },
  watch: {
    orderStatus(newStatus, oldStatus) {

      console.log('Статус заказа изменился:', oldStatus, '->', newStatus);
    },

  },
  methods: {
    getGenre(genre) {
      return this.genreMapping[genre] || genre;
    },
    async changeOrderStatus() {
      try {
        const token = localStorage.getItem('jwt')
        const orderCode = this.$route.params.orderCode;
        const response = await axios.post(`http://${this.$ComputerIP}/api/v1/order/getOrderDetail/${orderCode}/changeOrderStatus`,{}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && response.data.responseEntity) {
          console.log(response)
          this.orderStatus = response.data.responseEntity.orderStatus
          location.reload()
        } else {
          this.errorMessage = "статус не найдены!";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Ошибка на сервере.";
        } else {
          console.error("Ошибка в процессе изменения статуса:", error.message);
          this.errorMessage = "Произошла ошибка при загрузке данных.";
        }
      }
    },
    async getOrderItems() {
      try {
        const token = localStorage.getItem('jwt')
        const orderCode = this.$route.params.orderCode;
        const response = await axios.get(`http://${this.$ComputerIP}/api/v1/order/getOrderDetail/${orderCode}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data && response.data.responseEntity) {
          console.log(response)
          this.orderItems = response.data.responseEntity.listBookDto.map(bookDto => ({
            title: bookDto.bookName,
            price: bookDto.bookPrice,
            code: bookDto.bookCode,
            image: this.byteArrayToBase64(bookDto.image),
            quantity: bookDto.itemQuantity,
            genre: bookDto.bookGenre,
          }));
          this.orderStatus = response.data.responseEntity.orderStatus;
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

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

button:hover {
  opacity: 0.9;
}

button:focus {
  outline: none;
}

button:active {
  transform: scale(0.98);
}

.status-button {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

button.close-order {
  background-color: #e74c3c; /* Красный для кнопки "Закрыть заказ" */
  color: #fff;
}

button.close-order:hover {
  background-color: #c0392b; /* Более темный красный при наведении */
}

button.open-order {
  background-color: #2ecc71; /* Зеленый для кнопки "Открыть заказ" */
  color: #fff;
}

button.open-order:hover {
  background-color: #27ae60; /* Более темный зеленый при наведении */
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
  .cart-page {
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

