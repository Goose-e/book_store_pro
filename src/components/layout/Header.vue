<template>
  <header ref="header" :class="{ 'hidden': isHeaderHidden }">
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


      <div class="burger-menu" @click="toggleMenu">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <nav v-if="authority !== 'ADMIN'" :class="{ 'show': isMenuVisible }">
        <ul>
          <li><a :href="getLink('/api/v1/bookstore')">Главная</a></li>
          <li><a :href="getLink('/api/v1/bookstore/about')">О нас</a></li>
          <li><a :href="getLink('/api/v1/bookstore/contact')">Контакты</a></li>
          <li><a v-if="jwt != null" :href="getLink('/api/v1/bookstore/cart')">Корзина</a></li>
          <li><a v-if="jwt != null" :href="getLink('/api/v1/bookstore/orderList')">Заказы</a></li>
        </ul>
      </nav>

      <nav v-if="authority === 'ADMIN'" :class="{ 'show': isMenuVisible }">
        <ul>
          <li><a :href="getLink('/api/v1/bookstore/admin/orders')">Все заказы</a></li>
          <li><a :href="getLink('/api/v1/bookstore/admin/createBook')">Создать книгу</a></li>
          <li><a :href="getLink('/api/v1/bookstore/admin/users')">Управление пользователями</a></li>
          <li><a :href="getLink('/api/v1/bookstore/admin/books')">Заблокированные книги</a></li>
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
      authority: localStorage.getItem('authority'),
      bookName: '',
      searchBookList: [],
      bookCode: '',
      lastScrollPosition: 0,
      isHeaderHidden: false,
      isSearchResultsVisible: true,
      isMenuVisible: false,
      lastTouchY: 0,
      isMobile: false,
    };
  },
  mounted() {
    this.checkIfMobile(); // Проверяем, мобильное ли устройство
    this.addSwipeEventListeners();
    this.getBooks();
    window.addEventListener('scroll', this.handleScroll);
    this.addSwipeEventListeners();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    this.removeSwipeEventListeners();
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
    checkIfMobile() {
      this.isMobile = window.innerWidth <= 768; // Проверка мобильного устройства
      if (this.isMobile) {
        this.addSwipeEventListeners();
      } else {
        this.removeSwipeEventListeners();
      }
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
    goToHome() {
      this.$router.push('/api/v1/bookstore');
    },
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      this.isHeaderHidden = currentScrollPosition > this.lastScrollPosition;
      this.isSearchResultsVisible = currentScrollPosition < this.lastScrollPosition;

      this.lastScrollPosition = currentScrollPosition <= 0 ? 0 : currentScrollPosition;
    },
    addSwipeEventListeners() {
      const header = this.$refs.header;
      header.addEventListener('touchstart', this.handleTouchStart);
      header.addEventListener('touchend', this.handleTouchEnd);
    },
    removeSwipeEventListeners() {
      const header = this.$refs.header;
      header.removeEventListener('touchstart', this.handleTouchStart);
      header.removeEventListener('touchend', this.handleTouchEnd);
    },
    handleTouchStart(event) {
      if (Math.abs(event.touches[0].clientY - this.lastTouchY) > 10) {
        event.preventDefault();
      }
      this.lastTouchY = event.touches[0].clientY;
    },
    handleTouchEnd(event) {
      const currentTouchY = event.changedTouches[0].clientY;

      if (this.lastTouchY - currentTouchY > 50) {
        this.isHeaderHidden = true;
      } else if (currentTouchY - this.lastTouchY > 50) {
        this.isHeaderHidden = false;
      }
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
        const response = await axios.get(`http://${this.$ComputerIP}/api/v1/bookstore/home`);
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
    },

    getLink(path) {
      return `${window.location.origin}${path}`;
    }
  }
};
</script>

<style scoped>

header {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  overflow: visible;
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

.burger-menu {
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
}

.burger-menu div {
  width: 30px;
  height: 4px;
  background-color: #fff;
  border-radius: 2px;
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
  background-color: #393939;
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
  cursor: pointer;
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

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    align-content: center;
  }

  .burger-menu {
    display: flex;
    padding-bottom: 5px;
  }

  .header-container nav {
    display: none;
  }

  .header-container nav.show {
    display: block;
  }

  .header-container nav ul li {
    margin: 0 2em;
    padding-left: 0; /* Уберите или уменьшите отступ внутри элементов */
    text-align: left; /* Убедитесь, что текст выравнен по левому краю */
  }

  .header-search-bar {
    width: 100%;
    margin: 0.5em 0;
  }

  .header-container nav ul li a {
    font-size: 1.1em;
    padding: 1em 1.1em;
  }

  .search-bar {
    width: 100%;
  }

  .header-container nav ul li a:hover {
    background-color: #0f2c47;
  }

  nav ul {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    width: 100%;
    padding: 0;
  }

  nav ul li {
    width: 33.33%;
    text-align: center;
  }

  nav ul li a {
    display: block;
    padding: 1em;
    text-decoration: none;
    color: white;
    align-content: center;
  }

  .header-actions {
    display: flex;
    flex-direction: column;
  }
}
</style>
