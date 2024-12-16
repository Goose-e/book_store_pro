<template>
  <div class="page-container">
    <Header/>
    <Order/>
    <Footer/>
  </div>
</template>

<script>

import Order from '../components/usersFunctions/shopping/order/Order.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "Оформление заказа";
  },
  components: {
    Header,
    Order,
    Footer,
  }
};</script>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
}
Order {
  flex-grow: 1;
}
</style>

