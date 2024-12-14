<template>
  <section class="book-list" id="books">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="book-grid" v-else>
      <div v-for="book in books" :key="book.id" class="book" @click="onBookSelect(book)" >
        <div class="book-image" @click="onBookSelect(book)">
          <img :src="book.image" alt="Book Image"/>
        </div>
        <h3>{{ book.title }}</h3>
        <p>{{ book.price }} $</p>
        <button class="add-to-cart"  @click="addToCart(book)">Add to Cart</button>
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
      bookCode: ""
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
          console.log(response)
          this.books = response.data.responseEntity.listBookDto.map(bookDto => ({
            title: bookDto.bookName,
            price: bookDto.bookPrice,
            code: bookDto.code,
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
    async addToCart(book) {
      event.stopPropagation()
      try {
        if (!(this.books.length === 0)) {

          let bookCode = book.code
          console.log(bookCode)
          const token = localStorage.getItem('jwt')
          if (token != null){
          const response = (await axios.post("http://localhost:8080/api/v1/cart/addToCart",
              {bookCode}, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              }))}
          else {
            alert("Необходимо авторизоваться")
           //this.$router.push('/api/v1/auth/signin');
          }

        }

      } catch (error) {
        console.error("Ошибка в процессе добавления книги в корзину:", error.message);
        this.errorMessage = "Произошла ошибка при загрузке данных.";
      }
    },
    async onBookSelect(book) {
      try {
        console.log(book)
        this.bookCode = book.code;
        localStorage.setItem('bookCode', this.bookCode);
        this.bookName = '';
        this.$router.push(`/api/v1/bookstore/bookPage/${this.bookCode}`);


      } catch (error) {
        console.error('Ошибка при выборе книги:', error.message);
      }
    },
  }
}
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
  align-items: center; /* Центрируем элементы по горизонтали */
  justify-content: space-between;
  background-color: #2c2c2c;
  padding: 1em;
  margin: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s;
  cursor: pointer;
  height: 100%; /* Высота контейнера будет зависеть от содержимого */
}

.book:hover {
  transform: scale(1.05);
}

.book-image img {
  width: 100%; /* Картинки будут одинакового размера */
  height: 250px; /* Фиксированная высота */
  object-fit: cover; /* Изображение будет обрезаться, чтобы соответствовать размерам */
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
  margin: 0.5em 0; /* Отступ сверху и снизу */
}

.add-to-cart {
  padding: 0.5em 1em;
  background-color: #0073e6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%; /* Кнопка займет всю ширину контейнера */
  margin-top: 1em; /* Отступ сверху */
}

.add-to-cart:hover {
  background-color: #005bb5;
}

</style>
