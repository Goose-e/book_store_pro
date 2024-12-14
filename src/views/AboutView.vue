<template>
  <div class="page-container">
    <Header/>
    <about/>
    <Footer/>
  </div>
</template>

<script>

import About from '../components/About.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
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

