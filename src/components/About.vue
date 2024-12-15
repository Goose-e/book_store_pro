<template>
  <div class="about-us">
    <section class="about-content">
      <h1>О нас</h1>
      <p>
        Добро пожаловать в наш книжный магазин! Мы предлагаем широкий выбор книг разных жанров, чтобы удовлетворить
        любые интересы и предпочтения.
        Наша цель - помочь вам найти книгу, которая сделает ваш день особенным.
      </p>
      <h2>Наша миссия</h2>
      <p>
        Мы стремимся предоставить нашим клиентам лучший сервис, удобство покупок и доступ к качественным книгам.
        Мы уверены, что книги могут изменить мир, и мы гордимся тем, что можем помочь вам в этом путешествии.
      </p>

      <h2>Наши ценности</h2>
      <ul>
        <li>Качество: Мы тщательно отбираем только лучшие книги для нашего магазина.</li>
        <li>Обслуживание: Мы всегда готовы помочь и предложить вам лучшие рекомендации.</li>
        <li>Доступность: Мы стараемся, чтобы наши книги были доступны каждому по разумным ценам.</li>
        <li>Удобство: Наш сайт прост в использовании, чтобы вы могли легко найти и приобрести понравившиеся книги.</li>
      </ul>

      <h2>Наши партнеры</h2>
      <p>
        Мы работаем с множеством известных издательств и авторов, чтобы предоставить вам книги высокого качества.
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jwt: localStorage.getItem('jwt'),
      isHeaderHidden: false,
    };
  },
  methods: {
    goToHome() {
      this.$router.push('/api/v1/bookstore'); // Путь к главной странице
    },
  },
};
</script>

<style scoped>

.about-us {
  max-width: 1200px;
  margin: 30px auto;
  padding: 3em 1em;

}

.about-content {
  margin-top: 2em;
}

.about-content h1 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 0.5em;
}

.about-content h2 {
  font-size: 1.8em;
  color: #555;
  margin-top: 1.5em;
}

.about-content p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #666;
  margin-bottom: 1em;
}

.about-content ul {
  list-style-type: disc;
  margin-left: 2em;
  margin-bottom: 1.5em;
}

.about-content ul li {
  font-size: 1.1em;
  color: #555;
}
html, body {
  height: 100%;
  margin: 0;
}
@media (max-width: 768px) {
  .about-us {
    padding: 1.5em 1em;
  }

  .about-content h1 {
    font-size: 2em;
  }

  .about-content h2 {
    font-size: 1.5em;
  }

  .about-content p,
  .about-content ul li {
    font-size: 1em;
  }
}
</style>
