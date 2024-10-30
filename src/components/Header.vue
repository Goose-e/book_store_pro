<template>
  <header>
    <div class="header-container">
      <img src="../assets/logo.svg" alt="Bookstore Logo" class="logo">
      <div class="header-search-bar">
        <input type="text" placeholder="Search for books..." class="search-bar">
      </div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#cart">Cart</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="order-button">Order Now</button>
        <button class="logout-button">Logout</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
/* Header */
header {
  background-color: #333;
  color: #fff;
  padding: 1em 0;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1em;
}
.header-search-bar {
  flex-grow: 1; /* Позволяет строке поиска занимать доступное пространство */
  margin: 0 1em; /* Отступы для отделения от других элементов */
}
.search-bar {
  padding: 0.5em;
  margin-right: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%; /* Задает ширину 100% от родительского элемента */
  max-width: 600px; /* Максимальная ширина строки поиска */
}
.header-container .logo {
  height: 50px;
}
.header-container nav ul {
  display: flex;
  list-style: none;
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
.order-button,
.logout-button {
  padding: 0.5em 1em;
  background-color: #0073e6;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 0.5em; /* Отступ между кнопками */
}

</style>
