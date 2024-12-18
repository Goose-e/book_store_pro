<template>
  <div class="page-container">
    <Header/>
    <BlockedBookList/>
    <Footer/>
  </div>
</template>

<script>
import BlockedBookList from '../components/adminFunc/booksManage/BlockedBookList.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "Главная";
  },
  components: {
    Header,
    BlockedBookList,
    Footer,
  }
};</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #1C1C1CFF;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
}

.social-icons a {
  color: #fff;
  text-decoration: none;
  margin: 0 0.5em;
}

BlockedBookList {
  flex-grow: 1;
}


</style>