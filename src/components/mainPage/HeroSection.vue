<template>
  <section class="hero-section">
    <h1>Добро пожаловать в наш магазин!</h1>
    <p>Изучите удивительный мир книг!</p>
    <a href="#books" class="explore-button" @click="scrollToBooks">Изучить сейчас!</a>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  methods: {
    scrollToBooks(event) {
      event.preventDefault();
      const target = document.getElementById('books');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
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
  margin-top: 84px;
  position: relative;
  background: url('@/assets/Auth/images/background.jpeg') no-repeat center center fixed;
  background-size: cover;
}

.hero-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.hero-section h1, .hero-section p, .explore-button {
  position: relative;
  z-index: 2;
}

.hero-section h1 {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  color: #ffffff;
}

.hero-section p {
  font-size: 1.2em;
  color: #ffffff;
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
