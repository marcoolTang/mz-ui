<template>
  <div>
    {{ values[prop] > 0 ? values[prop]  : (total != 1 ? total : '') }}
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
const props = defineProps({
  values: Object,
  prop: String,
  formula: Object,
  tableData: Object,
  tableIndex: String | Number,
  formKey: String
})

const emits = defineEmits(['value-change'])
const total = ref(1)
watch(() => props.tableData, () => {
  total.value = 1
  props.formula.keys.forEach(item => {
    total.value *= props.tableData[props.tableIndex][item]
  })
  emits('value-change', {
    key: props.prop,
    value: total.value,
    index: props.tableIndex
  })
}, {
  deep: true
})


</script>