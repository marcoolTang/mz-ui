import { ref } from 'vue';
export const useUserStore = () => ({ token: '' });
export const useAssetsWarehouse = () => ({
    storehouseTree: [],
    getStorehouseTree: () => [],
});
// 在函数外部创建响应式状态(单例模式)
const iconsList = ref([]);

export function useIconsStore() {
    const setIconsList = (list) => {
        iconsList.value = list;
    };

    const getIconsList = () => {
        return iconsList.value;
    };

    return {
        iconsList,
        setIconsList,
        getIconsList,
    };
}
