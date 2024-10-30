<template>
  <div>
    <Header/>
    <HeroSection/>
    <BookList/>
    <Footer/>
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue';
import BookList from '../components/BookList.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Footer,
    Header,
    HeroSection,
    BookList
  }
};
</script>
