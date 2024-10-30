<template>
  <section class="book-list" id="books">
    <h2>Popular Books</h2>
    <div class="book-grid">
      <div class="book">
        <img src="../assets/logo1.png" alt="Book 1">
        <h3>Book Title 1</h3>
        <p>$10.00</p>
        <button class="buy-button">Buy</button>
      </div>
      <div class="book">
        <img src="../assets/logo1.png" alt="Book 2">
        <h3>Book Title 2</h3>
        <p>$12.00</p>
        <button class="buy-button">Buy</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { id: 1, title: 'Book Title 1', price: '$10.00', image: '../assets/logo1.png' },
        { id: 2, title: 'Book Title 2', price: '$12.00', image: '../assets/logo1.png' }
      ]
    };
  }
};
</script>

<style scoped>
/* Book List */
.book-list {
  padding: 2em 1em;
  background-color: #fff;
  text-align: center;
}
.book-list h2 {
  margin-bottom: 1em;
}
.book-grid {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.book {
  width: 200px;
  margin: 1em;
  text-align: center;
}
.book img {
  width: 100%;
  height: auto;
}
.buy-button {
  padding: 0.5em 1em;
  background-color: #0073e6;
  color: #fff;
  border: none;
  cursor: pointer;
}

</style>
