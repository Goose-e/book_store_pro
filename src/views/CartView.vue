

<template>
  <div class="page-container">
    <Header/>
    <Cart/>
    <Footer/>
  </div>
</template>
<script>
import Cart from '../components/Cart.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Header,
    Cart,
    Footer,
  }
};
</script>
<style scoped>

</style>