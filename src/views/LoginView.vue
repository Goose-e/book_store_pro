<template>
  <div>
    <LoginPage/>
  </div>
</template>

<script>
import LoginPage from "@/components/usersFunctions/auth/LoginPage.vue";
export default {
  mounted() {
    document.title = "Авторизация";
  },
  components: {
    LoginPage
  }
};
</script>
