<template>
  <div class="book-page">
    <div class="book-container">
      <!-- Картинка книги слева -->
      <div class="book-image-container">
        <img :src="book.image" alt="Book Image" class="book-image"/>
        <button class="add-to-cart" @click="addToCart">Положить в корзину</button>
      </div>

      <!-- Информация о книге справа -->
      <div class="book-info">
        <!-- Код товара сверху справа -->
        <div class="book-code">
          <span>Код товара: {{ book.bookCode }}</span>
        </div>

        <!-- Название книги -->
        <h1 class="book-title">{{ book.title }}</h1>

        <!-- Автор книги -->
        <p class="book-author">{{ book.author }}</p>

        <!-- Количество книг на складе -->
        <p class="book-availability">На складе: {{ book.availability }}</p>

        <!-- Описание книги -->
        <div class="book-description">
          <p>{{ book.description }}</p>
        </div>

        <!-- Кнопка добавления в корзину -->

      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import logo from "@/assets/books/logo1.png";

export default {
  data() {
    return {
      book: {
        image: '',
        title: '',
        author: '',
        availability: '',
        description: '',
        bookCode: '',
      },
    };
  },
  watch: {
    '$route.params.bookCode': {
      immediate: true,
      handler() {
        this.getBook();

      },
    },
  },
  methods: {
    async getBook() {
      try {
        let bookCode = this.$route.params.bookCode;

        if (!bookCode || bookCode.trim() === "") {
          console.error("Название книги отсутствует в localStorage");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/v1/bookstore/getByBookCode/" + bookCode);
        if (response.data && response.data.responseEntity) {

          this.book = {
            title: response.data.responseEntity.bookName,
            author: response.data.responseEntity.bookPublisher,
            availability: response.data.responseEntity.quantity, // количество на складе
            image: this.byteArrayToBase64(response.data.responseEntity.image),
            description: response.data.responseEntity.bookDescription,
            bookCode: response.data.responseEntity.bookCode,
          };

        } else {
          this.errorMessage = "Книга не найдена!";
        }
      } catch (error) {
        console.error("Ошибка в процессе загрузки книги:", error.message);
        this.errorMessage = "Произошла ошибка при загрузке данных.";
      }
    },
    byteArrayToBase64(base64String) {
      if (!base64String) {
        return logo;
      }
      return `data:image/png;base64,${base64String}`;
    },
    async addToCart() {


      try {
        let bookCode = this.$route.params.bookCode;
        const token = localStorage.getItem('jwt')
        const response = (await axios.post("http://localhost:8080/api/v1/cart/addToCart",
            {bookCode}, {
              headers: {
                'Authorization': `Bearer ${token}`
              }

            }))

        if (response.data) {
          alert(`Added "${this.book.title}" to cart!`);
        }
      } catch (error) {
        console.error("Ошибка в процессе добавления книги в корзину:", error.message);
        this.errorMessage = "Произошла ошибка при загрузке данных.";
      }
    }
  }
};
</script>


<style scoped>
.book-page {
  background-color: #2f2f2f;
  color: #fff;
  padding: 20px;
}

.book-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.book-image-container {
  flex: 1;
  max-width: 250px;
}

.book-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.book-info {
  flex: 2;
  padding-left: 20px;
}

.book-code {
  font-size: 1em;
  color: #ccc;
  text-align: right;
}

.book-title {
  font-size: 2em;
  font-weight: bold;
}

.book-author {
  font-size: 0.9em;
  color: #bbb;
  margin-bottom: 20px;
}

.book-availability {
  font-size: 1.1em;
  margin-bottom: 20px;
}

.book-description {
  font-size: 1em;
  margin-bottom: 20px;
}

.add-to-cart {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .book-container {
    flex-direction: column;
    align-items: center;
  }

  .book-info {
    padding-left: 0;
  }

  .book-title {
    font-size: 1.5em;
  }

  .book-image-container {
    max-width: 80%;
  }
}
</style>

