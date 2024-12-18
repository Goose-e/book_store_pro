<template>
  <div class="book-page">
    <div class="book-container">
      <div class="book-image-container">
        <img :src="image" alt="Book Image" class="book-image" @click="editImage"/>
        <div class="book-price" style="margin-top: 30px">
          <input type="text" placeholder="Цена" v-model="price" required/>
        </div>

        <div>
          <input type="file" @change="handleFileChange" placeholder="Картинка"/>
        </div>
      </div>

      <div class="book-info">
        <div class="book-header">
          <h1 class="book-title">
            <input type="text" placeholder="Название" v-model="title" required/>
          </h1>
        </div>

        <div class="book-code">
          <span>Код товара: {{ bookCode }}</span>
        </div>

        <p class="book-author">
          <input placeholder="Автор" type="text" v-model="author" required/>
        </p>
        <p class="book-genre">
          <input placeholder="Жанр(пока не трогать)" type="text" v-model="genre" required/>
        </p>
        <p class="book-pages">
        <input placeholder="Количество страниц" type="number" v-model="pages" required/>
      </p>
        <p class="book-availability">
          <input placeholder="Количество на складе" type="number" v-model="availability" required/>
        </p>

        <div class="book-description">
          <textarea placeholder="Описание" v-model="description" required></textarea>
        </div>

        <div>
          <button @click="updateBook" class="save-button">Сохранить</button>
        </div>
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

      image: '',
      title: '',
      author: '',
      availability: '',
      description: '',
      bookCode: null,
      price: '',
      genre: 'NO_GENRE',
      pages: '',
      status: ''
      ,
      isEditing: false,
      authority: '',
    };
  },
  mounted() {
    if(localStorage.getItem('jwt') == null || localStorage.getItem('authority') !== 'ADMIN'){
      this.$router.push(`/api/v1/bookstore`);
    }
  },
  watch: {
    '$route.params.bookCode': {
      immediate: true,
      handler() {
      },
    },
  },
  methods: {
    byteArrayToBase64(base64String) {
      if (!base64String) {
        return logo;
      }
      return `data:image/png;base64,${base64String}`;
    },


    async updateBook() {
      try {
        const token = localStorage.getItem('jwt')
        const response = await axios.post(`http://localhost:8080/api/v1/bookstore/admin/createOrUpdate`, {
          bookPages: this.pages,
          bookName: this.title,
          bookCode: this.bookCode,
          image: this.image,
          genre: 'NO_GENRE',
          bookPublisher: this.author,
          bookPrice: this.price,
          bookDescription: this.description,
          bookQuantity: this.availability,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        if (response.data) {
          alert("Книга добавлена!");
          this.$router.push(`/api/v1/bookstore`);

        }
      } catch (error) {
        console.error("Ошибка при добавлении книги:", error.message);
      }
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
          this.image = reader.result; // Обновить картинку
        };
        reader.readAsDataURL(file);
      }
    },


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

