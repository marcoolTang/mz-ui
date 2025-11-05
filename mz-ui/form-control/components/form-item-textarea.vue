<template>
  <el-input :modelValue="inputValue" @input="inputChange" :rows="5" type="textarea"  placeholder="请输入" />
</template>

<script setup>
import { ref } from 'vue'
const emits = defineEmits(['update:modelValue'])
const inputValue = ref('')
const inputChange = (e) => {
  emits('update:modelValue', e)
}
</script>