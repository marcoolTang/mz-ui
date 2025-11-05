<template>
  <div>
    {{ formData[itemIndex][prop] > 0 ? formData[itemIndex][prop] : (total != 1 ? total : '') }}
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  formData: Object,
  rowData: Object,
  prop: String,
  formula: Object,
  itemIndex: Number
})
const total = ref(1)
watch(() => props.formData, () => {
  total.value = 1
  props.formula.keys.forEach(item => {
    total.value *= props.formData[props.itemIndex][item]
  })
  emits('update:modelValue', total.value)
}, {
  deep: true
})


</script>