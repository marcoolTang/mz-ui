import type { App } from 'vue';
import MzTableView from './components/table-view/index.vue';
import MzContainerView from './components/container-view/index.vue';
import MzDetailView from './components/detail-view/index.vue';
import MzFilterView from './components/filter-view/index.vue';
import MzFormControl from './components/form-control/index.vue';
import MzFormView from './components/form-view/index.vue';
import MzSearchTree from './components/search-tree/index.vue';

// 导出工具函数
export * from './components/utils/index.js';

// 导出静态字典
export { default as staticDictionary } from './components/static-dictionary.js';

// 导出所有组件
export { MzTableView, MzContainerView, MzDetailView, MzFilterView, MzFormControl, MzFormView, MzSearchTree };

// 组件列表
const components = [MzTableView, MzContainerView, MzDetailView, MzFilterView, MzFormControl, MzFormView, MzSearchTree];

// 定义 install 方法
const install = (app: App): void => {
    components.forEach((component) => {
        app.component(component.name || component.__name, component);
    });
};

// 导出插件
const MzUI = {
    install,
    version: '1.0.1',
};

export default MzUI;

// ✅ SSR 完全安全的 CDN 支持
// 使用 IIFE 确保只在浏览器环境执行
(function () {
    if (typeof window === 'undefined') return;

    try {
        const win = window as any;
        if (win.Vue && typeof win.Vue.use === 'function') {
            win.Vue.use(MzUI);
        }
    } catch (e) {
        // 忽略错误，确保 SSR 不会崩溃
    }
})();
