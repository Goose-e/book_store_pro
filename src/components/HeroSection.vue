<template>
  <section class="hero-section">
    <h1>Welcome to Our Bookstore</h1>
    <p>Discover amazing books from various genres!</p>
    <a href="#books" class="explore-button">Explore Now</a>
  </section>
</template>

<script>
export default {
  name: "HeroSection"
};
</script>

<style scoped>
/* Hero Section */
.hero-section {
  text-align: center;
  padding: 4em 1em;
  background-color: #f4f4f4;
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
