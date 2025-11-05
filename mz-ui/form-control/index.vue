<template>
  <el-form :model="formData" ref="ruleFormRef" :rules="rules" :validate-on-rule-change="false">
    <template v-for="(item, index) in computedItems">
      <el-form-item :label="item.label" :prop="item.prop" :class="['custom_formitem_' + item.type]" v-if="item.type != 'value'">
        <component :is="components[item.type]" v-model="formData[item.prop]" v-bind="{ ...item }" :item-index="index"
          :row-data="rowData" :formData="formData">
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script setup>
import components from './components'
import { ref, computed } from 'vue';
const props = defineProps({
  formLayout: {
    default: 1,
    type: Number
  }
})
const _columns = ref([])
const dynamicFormLayout = ref(props.formLayout)
const formData = ref({})
const rules = ref({})
const ruleFormRef = ref()
const rowData = ref()
const setFormData = ({ type, data, columns, parentData, primaryKey }) => {
  rowData.value = data
  _columns.value = columns.map(item => {
    if (item.type == 'formtable') {
      formData.value[item.prop] = [{}]
      item.columns.forEach(it => {
        formData.value[item.prop][0][it.prop] = ''
      })
    }
    else {
      formData.value[item.prop] = ''
    }

    if (type == 'update' && data) {
      formData.value[primaryKey] = data[primaryKey]
      formData.value[item.prop] = data[item.prop]
    }
    if (item.type != 'value' && item.required) {
      rules.value[item.prop] = [{
        validator: item.validator ?? ((rule, value, callback) => {
          if (value === '') {
            callback(new Error(item.validatorMessage ?? '必填'));
          } else {
            callback();
          }
        }), required: true, trigger: 'change'
      }]
    }
    if (item.type == 'value') {
      formData.value[item.prop] = item.value
    }
    if (item.type == 'static-data' && !item.isParentNode) {
      formData.value[item.prop] = item.value;
    }
    if (item.inheritParent && type == 'save') {
      formData.value[item.prop] = data ? data[item.prop] : ''
    }
    if (item.isParentNode) {
      if (type == 'save') {
        formData.value[item.prop] = data ? data[item.valueKey] : 0
        item.showText = data ? data[item.labelKey] : item.showText
      }
      type == 'update' && (item.showText = (parentData ? parentData[item.labelKey] : item.showText))
    }
    return item
  })
}



const validateForm = () => {
  return new Promise((resolve) => {
    ruleFormRef.value.validate((valid) => {
      valid ? resolve(formData.value) : resolve()
    })
  })
}


// **计算动态 span**
const computedItems = computed(() => {

  let items = _columns.value.map(item => ({
    ...item,
    computedSpan: item.formLayout || props.formLayout || 6, // 默认 6
  }));

  let customSpans = items.filter(item => item.formLayout); // **定制化 `span`**
  let defaultItems = items.filter(item => !item.formLayout); // **默认 `span`**

  let result = [];

  // **第一步：分配定制化 `span` 及其配套元素**
  customSpans.forEach(custom => {
    let remainingSpan = 24 - custom.computedSpan; // **需要补足的 `span`**
    let requiredCount = Math.floor(remainingSpan / props.formLayout); // **需要多少个 `6` 来补足**
    let extraSpan = remainingSpan % props.formLayout; // **计算余数**
    let group = [custom];
    if (requiredCount == 0 && extraSpan) {
      requiredCount = 1
    }
    for (let i = 0; i < requiredCount && defaultItems.length > 0; i++) {
      let item = defaultItems.shift()
      item.computedSpan = remainingSpan / requiredCount
      group.push(item);
    }
    result.push(group);
  });

  // **第二步：剩余默认 `span` 均分**
  let defaultNums = 24 / props.formLayout
  while (defaultItems.length >= defaultNums) {
    result.push(defaultItems.splice(0, defaultNums)); // **每 4 个元素一组**
  }

  // **第三步：处理最后剩余元素**
  if (defaultItems.length < defaultNums && defaultItems.length > 1) {
    defaultItems.forEach(item => (item.computedSpan = 24 / defaultItems.length));
    result.push(defaultItems);
  } else {
    result.push(defaultItems);
  }

  // **展开结果**
  return result.flat();
});

defineExpose({
  setFormData,
  validateForm
})

</script>

<style scoped>
.formtable_title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  line-height: 21px;
}

.formtable_title::before {
  content: "";
  display: block;
  width: 4px;
  height: 12px;
  background-color: #E50213;
  border-radius: 1px;
  margin-right: 12px;
  position: relative;
}

.layout {
  width: 100%;
}
</style>