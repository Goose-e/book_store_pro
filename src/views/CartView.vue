<template>
  <div class="page-container">
    <Header/>
    <Cart/>
    <Footer/>
  </div>
</template>
<script>
import Cart from '@/components/usersFunctions/shopping/cart/Cart.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  mounted() {
    document.title = "Корзина";
  },
  components: {
    Header,
    Cart,
    Footer,
  }
};
</script>
<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%; /* Важно: чтобы Flexbox работал корректно */
}

.page-container {
  display: flex;
  color: #ffffff;
  flex-direction: column;

  min-height: 100vh;
}
main {
  flex: 1; /* Заставляем основной контент занимать всё доступное пространство */
  padding-top: 80px; /* Отступ сверху для основного контента */
}

footer {
  background-color: #2c2c2c;
  color: #fff;
  text-align: center;
  padding: 1em 0;
}
</style>