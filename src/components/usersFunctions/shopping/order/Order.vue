<template>
  <div class="order-page">
    <h1>Оформление заказа</h1>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="address">Адрес доставки:</label>
        <input
            type="text"
            id="address"
            v-model="order.address"
            placeholder="Введите адрес"
            required
        />
      </div>
      <div class="order-summary">
        <h2>Итог заказа</h2>
        <p>Общая сумма: <strong>{{ this.orderPrice }} ₽</strong></p>
      </div>
      <button type="submit" class="submit-button">Подтвердить заказ</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      order: {
        address: "", // Поле для адреса
      },
      address: '',
      orderPrice:'',
      orderDate: '',
      orderCode: ''
    };
  },
  mounted() {
    console.log("Цена из localStorage:", localStorage.getItem('price'));
    this.orderPrice = parseFloat(localStorage.getItem('price')) || 0;
    if(localStorage.getItem('jwt') == null){
      this.$router.push(`/api/v1/bookstore`);
    }
  },
  methods: {
    validateAddress() {
      if (!this.order.address || this.order.address.trim().length < 5) {
        alert("Пожалуйста, введите корректный адрес (минимум 5 символов).");
        return false;
      }
      return true;
    },
    async submitOrder() {
      if (!this.validateAddress()) return; // Проверка перед отправкой

      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.post(
            "http://localhost:8080/api/v1/order/addOrder",
            { address: this.order.address },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        if (response.data.errors.length === 0) {
          alert("Заказ успешно оформлен!");
          localStorage.removeItem('cartPrice');
          this.$router.push("/api/v1/bookstore");
        } else {
          alert("Ошибка оформления заказа: " + response.data.message);
        }
      } catch (error) {
        console.error("Ошибка при оформлении заказа:", error.message);
        alert("Произошла ошибка при оформлении заказа.");
      }
    },
  },
};
</script>

<style scoped>
.order-page {
  max-width: 600px;
  margin: 2em auto;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 110px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 1.5em;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.order-summary {
  margin-top: 2em;
}

.submit-button {
  display: block;
  width: 100%;
  padding: 0.75em;
  background-color: #0073e6;
  color: white;
  border: none;
  font-size: 1.2em;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1em;
}

.submit-button:hover {
  background-color: #005bb5;
}
</style>
