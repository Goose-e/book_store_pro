<template>
  <section class="contact-container" id="contact">
    <h1 class="contact-header">Контакты</h1>
    <div class="contact-details">
      <p><strong>Адрес:</strong> ул. Уличная, 0, Минск, Беларусь</p>
      <p><strong>Телефон:</strong> +375 (44) 456-78-90</p>
      <p><strong>Email:</strong> bookStore@gmail.com</p>
    </div>

    <div class="contact-form">
      <h2>Напишите нам</h2>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="form.name" placeholder="Ваше имя" required class="nameForm"><br>
        <input type="email" v-model="form.email" placeholder="Ваш email" required><br>
        <textarea v-model="form.message" rows="4" placeholder="Ваше сообщение" required></textarea><br>
        <button type="submit">Отправить</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      // Логика отправки
      console.log("Форма отправлена:", this.form);

      // Очистка полей формы
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';

      // Сообщение об успешной отправке
      alert('Ваше сообщение отправлено!');
    }
  }
};
</script>

<style scoped>
.contact-container {
  padding-top: 180px;
  padding-left: 20px;
  padding-right: 20px;
  height: 100%;
}

.contact-header {
  font-size: 2em;
  margin-bottom: 20px;
}

.contact-details {
  margin-bottom: 30px;
}

.contact-details p {
  margin: 5px 0;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.contact-form button:hover {
  background-color: #45a049;
}
</style>
