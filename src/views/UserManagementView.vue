<template>
  <div class="page-container">
    <Header/>
    <Users/>
    <Footer/>
  </div>
</template>

<script>

import Users from '../components/adminFunc/userManage/UsersManagement.vue';
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  mounted() {
    document.title = "Пользователи";
  },
  components: {
    Header,
    Users,
    Footer,
  }
};</script>
<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
  text-align: center;
  margin-top: auto;
}
Users {
  flex-grow: 1;
}
</style>

