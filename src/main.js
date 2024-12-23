import {createApp} from 'vue';
import App from './App.vue';
import router from './router/index.js';

const app = createApp(App);

app.config.globalProperties.$ComputerIP = '192.168.1.102:8080';

app.use(router).mount('#app');
