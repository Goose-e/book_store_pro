<template>
  <div class="login-page">
    <div class="background">
      <div class="welcome-text">
        <h1>Welcome to the Bookstore</h1>
        <p>Create your account</p>
      </div>
    </div>
    <div class="login-container">
      <h2>User Registration</h2>
      <form @submit.prevent="handleRegistration">
        <div class="input-group">
          <label for="username">
            <i class="icon user-icon"></i>
            <input type="text" id="username" v-model="username" placeholder="Create username" required/>
          </label>
        </div>
        <div class="input-group">
          <label for="password">
            <i class="icon lock-icon"></i>
            <input type="password" id="password" v-model="password" placeholder="Create password" required/>
          </label>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button type="submit" class="register-button">Зарегистрироваться</button>
        <button type="button" class="have-account-button" @click="goToSignIn">Есть аккаунт</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegistration() {
      console.log(this.username + this.password);
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup', {
          login: this.username,
          userAge: 18,
          password: this.password
        });
        if (response.data["responseCode"] === "OC_BUGS" && response.data["message"] === "User already exist") {
          this.errorMessage = "User already exist.";
        }
        else {
          console.log("Registration successful", response.data);
          this.$router.push('/api/v1/auth/signin');
        }
      } catch (error) {

        // Другая ошибка, например, сеть или серверная ошибка
        console.error("An error occurred during registration:", error.message);

      }

    },
    goToSignIn() {
      this.$router.push('/api/v1/auth/signin');// Убедитесь, что путь соответствует вашим маршрутам
    }
  }
}
;
</script>



<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: white;
}

.background {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
  url('../assets/Auth/images/background.jpeg') no-repeat center/cover;
  z-index: 0;
}


.welcome-text {
  text-align: center;
  padding-top: 2rem;
  font-weight: 200;
}

.login-container {
  background: #333;
  color: #e0e0e0;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  z-index: 1;
}

h2 {
  margin-bottom: 1.5rem;
  color: #f2f2f2;
}

.input-group {
  margin-bottom: 1rem;
  position: relative;
}

.icon {
  position: absolute;
  left: 10px;
  top: 10px;
  color: #e0e0e0;
}

.user-icon::before {
  content: "👤";
}

.lock-icon::before {
  content: "🔒";
}

input {
  width: 100%;
  padding: 10px 10px 10px 30px;
  border: 1px solid #777;
  border-radius: 4px;
  font-size: 1rem;
  background-color: #555;
  color: white;
}

.register-button {
  margin-top: 1rem;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #5a5a5a;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.have-account-button {
  margin-top: 1rem;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  background-color: #0073e6;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.register-button:hover {
  background-color: #4a4a4a;
}

.have-account-button:hover {
  background-color: #005bb5;
}
</style>
