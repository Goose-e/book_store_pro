<template>
  <div>
    <RegistrationPage/>
  </div>
</template>

<script>
import RegistrationPage from "@/components/usersFunctions/auth/RegistrationPage.vue";

export default {
  mounted() {
    document.title = "Регистрация";
  },
  components: {
    RegistrationPage
  }
};
</script>
