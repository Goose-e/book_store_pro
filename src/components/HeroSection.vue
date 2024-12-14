<template>
  <section class="hero-section">
    <h1>Welcome to Our Bookstore</h1>
    <p>Discover amazing books from various genres!</p>
    <a href="#books" class="explore-button" @click="scrollToBooks">Explore Now</a>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  methods: {
    scrollToBooks(event) {
      event.preventDefault(); // Останавливаем стандартное поведение перехода по ссылке
      const target = document.getElementById('books'); // Находим элемент с id 'books'
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth', // Плавный скролл
          block: 'start' // Скроллим до верхней части элемента
        });
      }
    }
  }
};
</script>

<style scoped>
.hero-section {
  text-align: center;
  padding: 8em 1em;
  background-color: #f4f4f4;
  margin-top: 84px;
}
.hero-section h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
}
.hero-section p {
  font-size: 1.2em;
  color: #666;
}
.explore-button {
  display: inline-block;
  margin-top: 1em;
  padding: 0.5em 1.5em;
  background-color: #0073e6;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}
</style>
