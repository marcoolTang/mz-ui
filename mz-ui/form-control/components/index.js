import formItemInput from './form-item-input.vue';
import formItemStaticData from './form-item-static-data.vue';
import formItemSelect from './form-item-select.vue';
import formItemSelectTree from './form-item-select-tree.vue';
import checkTree from './check-tree.vue';
import formItemIcons from './form-item-icons.vue';
import formTable from './form-item-formtable.vue';
import formItemDate from './form-item-date.vue';
import formItemTextarea from './form-item-textarea.vue';
import formItemFile from './form-item-file.vue';
import customSelectTable from './custom-select-table.vue';
import formItemSelectTable from './form-item-select-table.vue';
import formItemCalculate from './form-item-calculate.vue';
export default {
    text: formItemInput,
    icons: formItemIcons,
    'static-data': formItemStaticData,
    'check-tree': checkTree,
    select: formItemSelect,
    'select-tree': formItemSelectTree,
    formtable: formTable,
    date: formItemDate,
    textarea: formItemTextarea,
    file: formItemFile,
    'custom-select-table': customSelectTable,
    'select-table': formItemSelectTable,
    calculate: formItemCalculate,
    'filter-text': formItemInput,
};
