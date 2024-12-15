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