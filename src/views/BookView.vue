<template>
  <div class="page-container">
    <Header />
    <BookPage />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import BookPage from "@/components/usersFunctions/book/BookPage.vue";

export default {
  mounted() {
    document.title = "Книга";
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
.book-page{
  flex-grow: 1;
}
</style>
