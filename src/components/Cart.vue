<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="cartItems.length" class="cart-items">
      <div class="cart-item" v-for="(item, index) in cartItems" :key="item.id">
        <div class="book-details">
          <h3>{{ item.title }}</h3>
          <p>Автор: {{ item.author }}</p>
          <p>Цена: {{ item.price.toFixed(2) }} руб.</p>
        </div>

        <div class="quantity-controls">
          <button @click="decreaseQuantity(index)" :disabled="item.quantity <= 1">-</button>
          <input type="number" v-model.number="item.quantity" min="1" @change="updateQuantity(index)" />
          <button @click="increaseQuantity(index)">+</button>
        </div>

        <div class="item-total">
          <p>Итого: {{ (item.price * item.quantity).toFixed(2) }} руб.</p>
        </div>

        <button @click="removeItem(index)" class="remove-button">Удалить</button>
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
export default {
  data() {
    return {
      cartItems: [
        {
          id: 1,
          title: 'Война и мир',
          author: 'Лев Толстой',
          price: 25.99,
          quantity: 1,
        },
        {
          id: 2,
          title: 'Преступление и наказание',
          author: 'Фёдор Достоевский',
          price: 19.99,
          quantity: 2,
        },
      ],
    };
  },
  computed: {
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
  methods: {
    increaseQuantity(index) {
      this.cartItems[index].quantity += 1;
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
    removeItem(index) {
      this.cartItems.splice(index, 1);
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
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.cart-items {
  border-top: 1px solid #ccc;
  margin-top: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.book-details h3 {
  margin: 0 0 5px;
}

.quantity-controls {
  display: flex;
  align-items: center;
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
  margin: 0 5px;
}

.remove-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.cart-summary {
  text-align: right;
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
</style>
