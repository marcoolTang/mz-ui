<template>
  <el-tree-select :multiple="multiple" :check-strictly="checkStrictly ? '' : false" :node-key="optionValue || 'id'"
    v-model="treeValue" :data="treeOptions" filterable @change="selectChange" :props="{
      label: (data, node) => {
        if (props.nodeLable) {
          return data[props.nodeLable]
        }
        return data[props.optionLabel]
      }
    }" :loading="treeLoading" :disabled="disabled" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAssetsWarehouse } from '@store';

const stores = {
  'assets-warehouse': useAssetsWarehouse(),
}

const props = defineProps({
  store: String,
  modelValue: [String, Number, Array],  // 修改这里
  checkStrictly: Boolean,
  optionLabel: String,
  optionValue: String,
  options: {
    type: Array,
    default: () => []
  },
  nodeKey: String,
  nodeLable: String,
  disabled: Boolean,
  multiple: Boolean
})

const emits = defineEmits(['change', 'update:modelValue'])  // 添加 update:modelValue

const treeValue = ref(props.modelValue)
const treeLoading = ref(false)
const treeOptions = ref(props.options)
const treeData = ref([])

// 监听 props.modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  treeValue.value = newVal
})

// 监听 treeValue 的变化,同步到父组件
watch(treeValue, (newVal) => {
  emits('update:modelValue', newVal)
  emits('change', newVal)
})

const selectChange = (e) => {
  // 这里不需要 debugger 了,watch 会自动处理
}

if (props.store) {
  treeOptions.value = stores[props.store].treeData
}
</script>