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
export default {
    install,
};

// 支持 CDN 引入
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
