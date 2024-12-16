<template>
  <div class="page-container">
    <Header/>
    <OrderList/>
    <Footer/>
  </div>
</template>

<script>
import OrderList from '../components/usersFunctions/shopping/order/orderList.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "Ваши заказы";
  },
  components: {
    Header,
    OrderList,
    Footer,
  }
};</script>
<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%; /* Важно: чтобы Flexbox работал корректно */
}

.page-container {
  display: flex;
  flex-direction: column; /* Располагаем элементы вертикально */
  min-height: 100vh; /* Заставляем контейнер занимать всю высоту окна */
}

main {
  flex: 1; /* Заставляем основной контент занимать всё доступное пространство */
}

footer {
  background-color: #2c2c2c;
  color: #fff;
  text-align: center;
  padding: 1em 0;
}

</style>