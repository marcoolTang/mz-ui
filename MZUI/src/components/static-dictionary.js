import { Plus, UploadFilled, Download } from '@element-plus/icons-vue';

export const staticDictionary = {
    disposal: '处置',
    delete: '删除',
    update: '编辑',
    save: '新增',
    detail: '详情',
    'set-process-nodes': '设置流程节点',
    'determine-procurement': '确认采购',
    acceptance: '验收',
    'confirm-acceptance': '确认验收',
    'generate-detail': '查看盘点表',
    'asset-card': '资产卡片',
    'acceptance-order': '查看验收单',
    view: '查看',
    print: '打印',
};

export const topBtnsDictionary = {
    save: {
        label: '新增',
        type: 'primary',
        icon: Plus,
    },
    import: {
        label: '批量导入',
        icon: UploadFilled,
    },
    template: {
        label: '模板下载',
        icon: Download,
    },
    generate: {
        label: '生成盘点表',
        type: 'primary',
        icon: Plus,
    },
};
export default staticDictionary;
