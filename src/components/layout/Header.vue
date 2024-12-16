<template>
  <header :class="{ 'hidden': isHeaderHidden }">
    <div class="header-container">
      <img src="../../assets/logo/logo.png" alt="Bookstore Logo" @click="goToHome()" class="logo">
      <form @submit.prevent class="header-search-bar">
        <div class="header-search-bar">
          <input type="text" placeholder="Поиск книг..." id="bookName"
                 v-model="bookName"
                 class="search-bar"
                 autocomplete="off"
                 required
                 @keydown.enter="onSearchEnter"
          >
          <ul v-if="filteredBooks.length > 0 && isSearchResultsVisible" class="search-results">
            <li v-for="(book, index) in filteredBooks.slice(0, 15)" :key="book.id" @click="onBookSelect(book)">
              <img :src="book.image" alt="Book Thumbnail" class="book-thumbnail"/>
              {{ book.title }}
            </li>
            <li v-if="filteredBooks.length > 15">...</li>
          </ul>

        </div>
      </form>
      <nav>
        <ul>
          <li><a href="http://localhost:5173/api/v1/bookstore">Главная</a></li>
          <li><a href="http://localhost:5173/api/v1/bookstore/about">О нас</a></li>
          <li><a href="http://localhost:5173/api/v1/bookstore/contact">Контакты</a></li>
          <li><a v-if="jwt != null" href="http://localhost:5173/api/v1/bookstore/cart">Корзина</a></li>
          <li><a v-if="jwt != null" href="http://localhost:5173/api/v1/bookstore/orderList">Заказы</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button v-if="jwt != null" class="logout-button" @click="logout()">Выйти</button>
        <button v-if="jwt == null" class="login-button" @click="login()">Войти в аккаунт</button>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import logo from "@/assets/books/logo1.png";

export default {
  data() {
    return {
      jwt: localStorage.getItem('jwt'),
      bookName: '',
      searchBookList: [],
      bookCode: '',
      lastScrollPosition: 0,
      isHeaderHidden: false,
      isSearchResultsVisible: true,
    };
  },
  mounted() {
    this.getBooks();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    filteredBooks() {
      if (this.bookName.trim() === '') {
        return [];
      } else {
        return this.searchBookList.filter(book =>
            book.title.toLowerCase().includes(this.bookName.toLowerCase())
        );
      }
    },
  },
  methods: {
    goToHome() {
      this.$router.push('/api/v1/bookstore');
    },
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      this.isHeaderHidden = currentScrollPosition > this.lastScrollPosition;
      this.isSearchResultsVisible = currentScrollPosition < this.lastScrollPosition

      this.lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
    },
    async onBookSelect(book) {
      try {
        this.bookCode = book.code;
        localStorage.setItem('bookCode', this.bookCode);
        this.bookName = '';
        this.$router.push(`/api/v1/bookstore/bookPage/${this.bookCode}`);
      } catch (error) {
        console.error('Ошибка при выборе книги:', error.message);
      }
    },
    async getBooks() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/bookstore/home');
        if (response.data && response.data.responseEntity) {
          this.searchBookList = response.data.responseEntity.listBookDto.map(bookDto => ({
            title: bookDto.bookName,
            price: bookDto.bookPrice,
            image: this.byteArrayToBase64(bookDto.image),
            code: bookDto.code
          }));
        } else {
          this.errorMessage = "Книги не найдены!";
        }
      } catch (error) {
        console.error("Ошибка в процессе загрузки книг:", error.message);
        this.errorMessage = "Произошла ошибка при загрузке данных.";
      }
    },
    byteArrayToBase64(base64String) {
      if (!base64String) {
        return logo;
      }
      return `data:image/png;base64,${base64String}`;
    },
    async logout() {
      localStorage.clear();
      this.jwt = null;
      location.reload();
    },
    async login() {
      this.$router.push('/api/v1/auth/signin');
    },
    onSearchEnter() {
      if (this.bookName.trim() !== '') {
        this.$router.push(`/api/v1/bookstore/searchBooks/${this.bookName}`);

      }
    }

  }
};
</script>

<style scoped>
/* Основной стиль для header */
header {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
}

header.hidden {
  transform: translateY(-100%);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  padding: 0 1em;
  flex-wrap: wrap;
}

.logo {
  height: 60px;
  cursor: pointer;
}

.header-search-bar {
  flex-grow: 1;
  margin: 0 1em;
  position: relative;
}

.search-bar {
  padding: 0.5em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 0.5em;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.search-results li {
  display: flex;
  align-items: center;
  padding: 0.5em;
  border-bottom: 1px solid #ccc;
  cursor: pointer; /* Добавляем стиль для изменения курсора */
}

.search-results li:last-child {
  border-bottom: none;
}

.header-container nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.header-container nav ul li {
  margin: 0 1em;
}

.header-container nav ul li a {
  color: #fff;
  text-decoration: none;
}

.header-actions {
  display: flex;
  align-items: center;
}

.login-button,
.logout-button {
  padding: 0.5em 1em;
  background-color: #0073e6;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 0.5em;
}

.book-thumbnail {
  width: 30px;
  height: 40px;
  object-fit: cover;
  margin-right: 0.5em;
  border-radius: 4px;
}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-search-bar {
    width: 100%;
    margin: 0.5em 0;
  }

  .search-bar {
    width: 100%;
  }

  nav ul {
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    padding: 0;
  }

  nav ul li {
    margin: 0.5em 0;
  }

  .header-actions {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-top: 0.5em;
  }

  .login-button,
  .logout-button {
    width: 100%;
    margin: 0.2em 0;
  }
}
</style>
