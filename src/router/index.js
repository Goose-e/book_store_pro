import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";
import BookView from "@/views/BookView.vue";
import AboutView from "@/views/AboutView.vue";
import ContactView from "@/views/ContactView.vue";
import CartView from "@/views/CartView.vue";
import OrderPage from "@/views/OrderView.vue";
import OrderListView from "@/views/orderListView.vue";
import FoundBooks from "@/views/FoundBooksView.vue";
const routes = [
    {
        path: '/',                // Корневой маршрут
        redirect: '/api/v1/bookstore',  // Перенаправление на страницу входа
    },
    {
        path: '/api/v1/bookstore',  // Путь для главной страницы
        name: 'home',  // Имя маршрута, без слэша в начале
        component: HomeView
    },
    {
        path: "/api/v1/bookstore/order",
        name: "OrderPage",
        component: OrderPage,
    },
    {
        path: "/api/v1/bookstore/orderList",
        name: "OrderListPage",
        component: OrderListView,
    },
    {
        path: "/api/v1/bookstore/searchBooks/:bookName",
        name: "FoundBooks",
        component: FoundBooks,
    },
    {
        path: '/api/v1/bookstore/bookPage/:bookCode',
        name: 'bookPage',
        component: BookView
    },
    {
        path: '/api/v1/auth/signin',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/api/v1/bookstore/about',
        name: 'about',
        component: AboutView
    },
    {
        path: '/api/v1/bookstore/contact',
        name: 'contact',
        component: ContactView
    },
    {
        path: '/api/v1/bookstore/cart',
        name: 'cart',
        component: CartView
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
