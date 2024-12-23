<template>
  <div class="page-container">
    <Header/>
    <BookPage/>
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import BookPage from "@/components/adminFunc/booksManage/CreateBook.vue";

export default {
  mounted() {
    document.title = "Создание книги";
  },
  components: {
    Header,
    BookPage,
    Footer,
  }
};
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1c1c1c;
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

BookPage {
  flex-grow: 1;
}

.book-page {
  flex-grow: 1;
}
</style>
