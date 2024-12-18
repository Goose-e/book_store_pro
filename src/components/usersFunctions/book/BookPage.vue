<template>
  <div class="book-page">
    <div class="book-container">
      <div class="book-image-container">
        <img :src="book.image" alt="Book Image" class="book-image" @click="editImage"/>
        <div class="book-price" style="margin-top: 30px">
          <input v-if="isEditing" type="text" v-model="book.price" required/>
          <span v-else> {{ book.price }}$</span>
        </div>
        <button v-if="!isEditing" class="add-to-cart" @click="addToCart">Положить в корзину</button>

        <div v-if="isEditing">
          <input type="file" @change="handleFileChange"/>
        </div>
      </div>

      <div class="book-info">
        <div class="book-header">
          <h1 class="book-title">
            <input v-if="isEditing" type="text" v-model="book.title" required/>
            <span v-else>{{ book.title }}</span>
          </h1>
        </div>

        <!-- Book Code Section -->
        <div class="book-code">
          <span>Код товара: {{ book.bookCode }}</span>
        </div>

        <p class="book-author">
          <input v-if="isEditing" type="text" v-model="book.author" required/>
          <span v-else>автор: {{ book.author }}</span>
        </p>
        <p class="book-pages">
          <input v-if="isEditing" type="text" v-model="book.pages" required/>
          <span v-else>страниц: {{ book.pages }}</span>
        </p>
        <p class="book-genre">
          <input v-if="isEditing" type="text" v-model="book.genre" required/>
          <span v-else>Жанр: {{ book.genre }}</span>
        </p>
        <p class="book-availability">
          <input v-if="isEditing" type="number" v-model="book.availability" required/>
          <span v-else>на складе: {{ book.availability }}</span>
        </p>

        <div class="book-description">
          <textarea v-if="isEditing" v-model="book.description" required></textarea>
          <p v-else>{{ book.description }}</p>
        </div>

        <div v-if="isEditing">
          <button @click="updateBook" class="save-button">Сохранить изменения</button>
          <button @click="cancelEdit" class="cancel-button">Отмена</button>
        </div>
      </div>
    </div>

    <!-- Buttons positioned at bottom-right -->
    <div v-if="!isEditing && authority === 'ADMIN'" class="edit-delete-buttons">
      <button @click="isEditing = true" class="edit-button">Изменить</button>
      <button v-if="book.image" @click="removeBook" class="remove-image">Изменить статус</button>
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
        price: '',
        genre: '',
        pages: '',
        status: ''
      },
      isEditing: false,
      authority: '',
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
        this.authority = localStorage.getItem('authority');
        let bookCode = this.$route.params.bookCode;
        if (!bookCode || bookCode.trim() === "") {
          console.error("Название книги отсутствует в localStorage");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/v1/bookstore/getByBookCode/" + bookCode);
        console.log(response)
        if (response.data && response.data.responseEntity) {
          this.book = {
            title: response.data.responseEntity.bookName,
            author: response.data.responseEntity.bookPublisher,
            availability: response.data.responseEntity.quantity,
            image: this.byteArrayToBase64(response.data.responseEntity.image),
            description: response.data.responseEntity.bookDescription,
            bookCode: response.data.responseEntity.bookCode,
            price: response.data.responseEntity.bookPrice,
            genre: response.data.responseEntity.genre,
            pages: response.data.responseEntity.bookPages,
            status: response.data.responseEntity.bookStatusEnum
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
        const token = localStorage.getItem('jwt');
        if (token != null) {
          const response = await axios.post("http://localhost:8080/api/v1/cart/addToCart", {bookCode}, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.data) {
            alert(`Added "${this.book.title}" to cart!`);
          }
        } else {
          alert("Необходимо авторизоваться");
        }
      } catch (error) {
        console.error("Ошибка в процессе добавления книги в корзину:", error.message);
        this.errorMessage = "Произошла ошибка при загрузке данных.";
      }
    },
    async updateBook() {
      try {
        const token = localStorage.getItem('jwt')
        const response = await axios.post(`http://localhost:8080/api/v1/bookstore/admin/createOrUpdate`, {
          bookPages: this.book.pages,
          bookName: this.book.title,
          bookCode: this.book.bookCode,
          image: this.book.image,
          genre: this.book.genre,
          bookPublisher: this.book.author,
          bookPrice: this.book.price,
          bookDescription: this.book.description,
          bookQuantity: this.book.availability,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          alert("Информация о книге обновлена!");
          this.isEditing = false;
          this.getBook();
        }
      } catch (error) {
        console.error("Ошибка при обновлении данных книги:", error.message);
      }
    },

    cancelEdit() {
      this.isEditing = false;
      this.getBook(); // Отменить редактирование и восстановить оригинальные данные
    },

    editImage() {
      if (this.isEditing) {
        document.querySelector('input[type="file"]').click();  // Открыть диалог выбора файла
      }
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.book.image = reader.result; // Обновить картинку
        };
        reader.readAsDataURL(file);
      }
    },
    async removeBook() {
      try {
        console.log(this.book.status)
        let newStatus = this.book.status === 0 ? 2 : 0
        console.log(newStatus)
        const token = localStorage.getItem('jwt');
        const response = await axios.post("http://localhost:8080/api/v1/bookstore/admin/changeBookStatus", {
          bookCode: this.book.bookCode,
          bookStatusId: newStatus
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        if (response.data) {
          this.book.status = newStatus;
          alert(`Статус книги изменён на ${newStatus === 0 ? 'активен' : 'закрыт'}`);
        }
      } catch (error) {
        console.error("Ошибка при удалении книги:", error.message);
        alert("Произошла ошибка при удалении книги.");
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
  margin-top: 80px;
  position: relative; /* This ensures the buttons are positioned relative to this container */
}

.book-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.book-image-container {
  flex: 1;
  max-width: 250px;
  position: relative;
}

.book-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  cursor: pointer;
}

.remove-image {
  background-color: #e74c3c;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.remove-image:hover {
  opacity: 0.8;
}

.book-info {
  flex: 2;
  padding-left: 20px;
}

.book-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.book-code {
  font-size: 1em;
  color: #ccc;
  text-align: right;
  margin-bottom: 10px; /* Added margin to avoid overlap */
}

.book-title {
  font-size: 2em;
  font-weight: bold;
}

.book-author .book-pages {
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
  margin-top: 30px;
  margin-left: 30px;
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.book-price {
  align-items: center;
  margin-left: 110px;
}

.add-to-cart:hover {
  background-color: #2980b9;
}

.edit-button,
.save-button,
.cancel-button {
  padding: 10px 20px;
  font-size: 1em;
  color: #fff;
  background-color: #f39c12;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.save-button {
  background-color: #2ecc71;
}

.cancel-button {
  background-color: #e74c3c;
}

.edit-button:hover,
.save-button:hover,
.cancel-button:hover {
  opacity: 0.8;
}

.form-group {
  margin-bottom: 15px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

/* Buttons Positioned at Bottom-Right */
.edit-delete-buttons {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.edit-button {
  background-color: #e74c3c;
}
</style>

