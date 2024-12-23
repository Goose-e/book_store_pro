<template>
  <div class="page-container">
    <Header/>
    <about/>
    <Footer/>
  </div>
</template>

<script>

import About from '../components/infoPages/About.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "О нас";
  },
  components: {
    Header,
    About,
    Footer,
  }
};</script>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #393939;;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
}
About {
  flex-grow: 1;
}
</style>

