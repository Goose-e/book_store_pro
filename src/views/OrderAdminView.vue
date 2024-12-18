<template>
  <div class="page-container">
    <Header/>
    <OrderAdmin/>
    <Footer/>
  </div>
</template>

<script>

import OrderAdmin from '../components/adminFunc/userManage/OrderAdmin.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "Заказы";
  },
  components: {
    Header,
    OrderAdmin,
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
OrderAdmin {
  flex-grow: 1;
}
</style>

