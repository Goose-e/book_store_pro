<template>
  <div>
    <Header/>
    <HeroSection/>
    <BookList/>
    <Footer/>
  </div>
</template>

<script>
import HeroSection from '../components/mainPage/HeroSection.vue';
import BookList from '../components/mainPage/BookList.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "Главная";
  },
  components: {
    Header,
    HeroSection,
    BookList,
    Footer,
  }
};</script>
<style>
.page-container-home {
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
  margin-top: auto;

}

</style>