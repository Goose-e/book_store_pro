<template>
  <section class="book-list" id="books">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="book-grid" v-else>
      <div v-for="book in books" :key="book.id" class="book">
        <div class="book-image">
          <img :src="book.image" alt="Book Image" />
        </div>
        <h3>{{ book.title }}</h3>
        <p>{{ book.price }} $</p>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import logo from "@/assets/books/logo1.png";

export default {
  data() {
    return {
      books: [],
      errorMessage: "",
    };
  },
  mounted() {
    this.getAllBooks();
  },
  methods: {
    byteArrayToBase64(base64String) {
      if (!base64String) {
        return logo;
      }

      return `data:image/png;base64,${base64String}`;
    },
    async getAllBooks() {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/bookstore/home");
        if (response.data && response.data.responseEntity) {
          this.books = response.data.responseEntity.listBookDto.map(bookDto => ({
            title: bookDto.bookName,
            price: bookDto.bookPrice,
            image: this.byteArrayToBase64(bookDto.image),
          }));
          localStorage.setItem("books", JSON.stringify(this.books)); // Сохраняем данные в localStorage
        } else {
          this.errorMessage = "Книги не найдены!";
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.errorMessage = "Ошибка на сервере.";
        } else {
          console.error("Ошибка в процессе загрузки книг:", error.message);
          this.errorMessage = "Произошла ошибка при загрузке данных.";
        }
      }
    },
  },
};
</script>

<style scoped>
.book-list {
  padding: 2em;
  text-align: center;
  background-color: #1c1c1c;
  color: #fff;
}

.error-message {
  color: red;
  font-size: 1.2em;
  margin: 1em 0;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  gap: 1em;
}

.book {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2c2c2c;
  padding: 1em;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s;
}

.book:hover {
  transform: scale(1.05);
}

.book-image img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1em;
  border-radius: 4px;
}

h3 {
  font-size: 1.2em;
  margin: 0.5em 0;
}

p {
  font-size: 1em;
  color: #ccc;
}

.add-to-cart {
  padding: 0.5em 1em;
  background-color: #0073e6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #005bb5;
}
</style>
