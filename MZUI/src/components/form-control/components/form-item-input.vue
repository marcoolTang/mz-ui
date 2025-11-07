<template>
  <el-input :modelValue="inputValue" @input="inputChange" type="text" placeholder="请输入">
    <template #prepend v-if="prepend">{{ prepend }}</template>
    <template #append v-if="append">{{ append }}</template>
  </el-input>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  prepend: {
    default: '',
    type: String
  },
  append: {
    default: '',
    type: String
  }
})
const emits = defineEmits(['update:modelValue'])
const inputValue = ref('')
const inputChange = (e) => {
  emits('update:modelValue', e)
}
</script>