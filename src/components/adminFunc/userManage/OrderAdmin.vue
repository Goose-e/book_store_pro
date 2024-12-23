<template>
  <div class="order-list">
    <h1>Заказы</h1>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div v-if="orders.length > 0" class="order-grid">
      <div v-for="order in orders" :key="order.orderCode" class="order-card" @click ="onOrderSelect(order.orderCode)">
        <div class="order-details">
          <h3>Заказ №{{ order.orderCode }}</h3>
          <p><strong>Пользователь:</strong> {{ order.userName }}</p>
          <p><strong>Адрес:</strong> {{ order.address }}</p>
          <p><strong>Дата:</strong> {{ formatDate(order.orderDate) }}</p>
          <p><strong>Цена:</strong> {{ order.orderPrice }}$</p>
          <p><strong>Статус:</strong>
            <span :class="getStatusClass(order.status)">{{ getStatusText(order.status) }}</span>
          </p>
        </div>
      </div>
    </div>


    <p v-else>У вас пока нет заказов.</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      errorMessage: "",
    };
  },
  mounted() {
    this.getOrders();
    if (localStorage.getItem('jwt') == null || localStorage.getItem('authority') !== 'ADMIN') {
      this.$router.push(`/api/v1/bookstore`);
    }
  },
  methods: {
    async onOrderSelect(order){
      try {
        console.log(order)

        this.$router.push(`/api/v1/bookstore/orderDetails/${order}`);
      } catch (error) {
        console.error('Ошибка при выборе заказа:', error.message);
      }
    },
    formatDate(dateString) {

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      return new Date(dateString[0], dateString[1], dateString[2], dateString[3], dateString[4], dateString[5], dateString[6]).toLocaleDateString("ru-RU", options);
    },

    async getOrders() {
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.get(`http://${this.$ComputerIP}/api/v1/userManagement/getAllOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (response.data && response.data.responseEntity) {
          this.orders = response.data.responseEntity.listOrderDto.map(orderDto => ({
            userName: orderDto.userName,
            address: orderDto.address,
            orderPrice: orderDto.orderPrice,
            orderDate: orderDto.orderDate,
            orderCode: orderDto.orderCode,
            status: orderDto.orderStatus,
          }));
        } else {
          this.errorMessage = "Заказы не найдены!";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Ошибка на сервере.";
        } else {
          console.error("Ошибка в процессе загрузки заказов:", error.message);
          this.errorMessage = "Произошла ошибка при загрузке данных.";
        }
      }
    },
    // Преобразование статуса в текст
    getStatusText(status) {
      if (status === 6 || status === 'ORDER_ACTUAL') return "Открыт";
      if (status === 7 || status === 'ORDER_CLOSED') return "Закрыт";
      return "Неизвестный статус";
    },
    // Класс для статуса
    getStatusClass(status) {
      if (status === 6 || status === 'ORDER_ACTUAL') return "status-open";
      if (status === 7 || status === 'ORDER_CLOSED') return "status-closed";
      return "status-unknown";
    },
  },
};
</script>

<style scoped>
.order-list {
  height: 100%;
  padding: 2em;
  text-align: center;
  background-color: #1c1c1c;
  color: #fff;
  margin-top: 84px;
}

.error-message {
  color: red;
  font-size: 1.2em;
  margin: 1em 0;
}

.order-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 1em;
}

.order-card {
  background-color: #2c2c2c;
  padding: 1em;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s;
  height: 100%;
  cursor: pointer;
}

.order-card:hover {
  transform: scale(1.03);
}

.order-details {
  text-align: left;
}

.order-details h3 {
  font-size: 1.2em;
  margin-bottom: 0.5em;
}

.order-details p {
  font-size: 1em;
  color: #ccc;
  margin: 0.2em 0;
}

.order-details .status-open {
  color: #28a745; /* Зеленый цвет для открытого статуса */
}

.order-details .status-closed {
  color: #dc3545; /* Красный цвет для закрытого статуса */
}

.order-details .status-unknown {
  color: #ffc107; /* Желтый цвет для неизвестного статуса */
}

/* Адаптивные стили */
@media (max-width: 768px) {
  .order-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .order-grid {
    grid-template-columns: 1fr;
  }
}
</style>
