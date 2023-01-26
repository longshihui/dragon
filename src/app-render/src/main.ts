import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const pinia = createPinia();
const router = createRouter({
    history: createWebHashHistory(),
    routes: []
});

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
