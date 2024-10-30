import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";

const routes = [
    {
        path: '/',                // Корневой маршрут
        redirect: '/api/v1/auth/signin',  // Перенаправление на страницу входа
    },
    {
        path: '/api/v1/bookstore',  // Путь для главной страницы
        name: 'home',  // Имя маршрута, без слэша в начале
        component: HomeView
    },
    {
        path: '/api/v1/auth/signin',  // Путь для страницы входа
        name: 'Login',  // Имя маршрута, без слэша в начале
        component: LoginView
    },
    {
        path: '/api/v1/auth/signup',  // Путь для страницы входа
        name: 'Registration',  // Имя маршрута, без слэша в начале
        component: RegistrationView
    }
];

// Создание экземпляра маршрутизатора
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),  // Используем history API
    routes
});

// Экспорт маршрутизатора
export default router;
