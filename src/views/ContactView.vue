<template>
  <div class="page-container">
    <Header/>
    <Contact/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Contact from "@/components/infoPages/Contact.vue";

export default {
  mounted() {
    document.title = "Контакты";
  },
  components: {
    Header,
    Contact,
    Footer,
  }
};
</script>
<style scoped>
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
Contact {
  flex-grow: 1;
  height: 100%;
}
</style>