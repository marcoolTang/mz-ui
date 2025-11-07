<template>
  <el-select placeholder="请选择" :modelValue="values[prop]" @change="selectChange" style="width:100%;" :disabled="!selectable(values)">
    <el-option v-for="item in selectOptions" :key="item[optionValue]" :label="item[optionLabel]"
      :value="item[optionValue]">
    </el-option>
  </el-select>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  options: Array,
  prop: String,
  values: Object,
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },
  tableIndex: String | Number,
  selectable:Function
})
const emits = defineEmits(['value-change'])
const selectOptions = ref(props.options)
const selectChange = (value) => {
  emits('value-change', {
    key: props.prop,
    value: value,
    index: props.tableIndex
  })
}
</script>