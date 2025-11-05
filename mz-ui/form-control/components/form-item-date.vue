<template>
  <el-date-picker 
    v-model="datePickValue" 
    value-format="x" 
    :format="format || dateFormat"
    :type="formatType"
    placeholder="请选择日期" 
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  formatType: {
    type: String,
    default: 'datetime'
  },
  format: {  // 允许外部传入自定义格式
    type: String,
    default: ''
  }
})

// 默认格式映射
const dateFormat = computed(() => {
  const formatMap = {
    'datetime': 'YYYY-MM-DD HH:mm:ss',
    'date': 'YYYY-MM-DD',
    'datetimerange': 'YYYY-MM-DD HH:mm:ss',
    'daterange': 'YYYY-MM-DD'
  }
  return formatMap[props.formatType] || 'YYYY-MM-DD'
})

const emits = defineEmits(['update:modelValue'])

const datePickValue = ref(props.modelValue)

// 监听内部值变化，向外emit
watch(datePickValue, (newVal) => {
   // 如果是 date 类型，需要补上当前时分秒
  if (props.formatType === 'datetime') {
    const d = new Date(Number(newVal))
    const now = new Date()
    d.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), 0)
    emits('update:modelValue', d.getTime()) // 返回补齐时分秒后的时间戳
  } else {
    emits('update:modelValue', newVal)
  }
})

// 监听外部props变化，更新内部值
watch(() => props.modelValue, (newVal) => {
  datePickValue.value = newVal
})
</script>