<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  color: #333;
  min-height: 100vh; /* Убедитесь, что body занимает всю высоту экрана */
  display: flex;
  flex-direction: column; /* Вертикальная ориентация */
}

#app {
  flex: 1; /* Позволяет вашему основному контенту занимать доступное пространство */
}

/* Дополнительные стили можно добавить здесь */
</style>
