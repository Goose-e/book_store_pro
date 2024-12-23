<template>
  <div class="page-container">
    <Header/>
    <Order/>
    <Footer/>
  </div>
</template>
<script>
import Order from '@/components/usersFunctions/shopping/order/OrderPage.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  mounted() {
    document.title = "Детали заказа ";
  },
  components: {
    Header,
    Order,
    Footer,
  }
};
</script>
<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.page-container {
  display: flex;
  color: #ffffff;
  flex-direction: column;

  min-height: 100vh;
}
main {
  flex: 1;
  padding-top: 80px;
}

footer {
  background-color: #2c2c2c;
  color: #fff;
  text-align: center;
  padding: 1em 0;
}
</style>