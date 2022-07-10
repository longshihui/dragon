import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import store from './store';
import { DragonAppModules } from './dragon-modules';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: import('./components/DragonModuleStore.vue')
    },
    ...DragonAppModules.map(moduleOptions => {
        return moduleOptions.route;
    })
];
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
