<template>
  <div class="login-page">
    <div class="background">
      <div class="welcome-text">
        <h1>Welcome to the Bookstore</h1>
        <p>Your gateway to a world of books...</p>
      </div>
    </div>
    <div class="login-container">
      <h2>User Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label for="username">
            <i class="icon user-icon"></i>
            <input v-model="username" type="text" id="username" placeholder="Username"/>
          </label>
        </div>
        <div class="input-group">
          <label for="password">
            <i class="icon lock-icon"></i>
            <input v-model="password" type="password" id="password" placeholder="Password"/>
          </label>
        </div>
        <button type="submit" class="register-button">Log in</button>
        <button type="button" class="have-account-button" @click="goToSignUp">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async handleLogin() {
      if (this.username && this.password) {
        try {

          await axios.post('http://localhost:5000/api/v1/auth/signin', {
            login: this.username,
            password: this.password
          })
              .then(response => {
                console.log("Login successful", response.data);
                this.$router.push('/api/v1/bookstore');
              })
              .catch(error => {
                console.error("Login failed:", error.response ? error.response.data : error.message);
              });

        } catch (error) {
          console.error("An error occurred during login:", error.message);
        }
      } else {
        console.error("Please enter both username and password.");
      }
    },
    goToSignUp() {
      this.$router.push('/api/v1/auth/signup');
    }
  }
};
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
  z-index: -1;
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
<script setup lang="ts">
</script>