<template>
  <div class="page-container">
    <Header />
    <BookPage />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import BookPage from "@/components/BookPage.vue";

export default {
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
  min-height: 100vh; /* Занимает всю высоту экрана */
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
  margin-top: auto; /* Это делает футер прикрепленным к низу страницы */
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
