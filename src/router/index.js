import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import BookView from "@/views/BookView.vue";
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
        path: '/api/v1/bookstore/bookpage/:bookCode',
        name: 'bookPage',
        component: BookView
    },
    {
        path: '/api/v1/auth/signin',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/api/v1/auth/signup',
        name: 'Registration',
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
