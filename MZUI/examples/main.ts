import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createRouter, createWebHistory } from 'vue-router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';

// 导入组件库
import MzUI from '../src/index';
// 创建路由实例(即使不用路由功能,也需要创建实例来避免注入错误)
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: App,
        },
    ],
});
const app = createApp(App);

// 注册 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(ElementPlus);
app.use(MzUI);
app.use(router); // 添加路由
app.mount('#app');
