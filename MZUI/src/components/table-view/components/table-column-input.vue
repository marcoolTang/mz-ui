<template>
  <el-input type="text" :modelValue="values[prop]" @input="selectChange" v-if="!isDisabled && selectable(values)"></el-input>
  <div v-else>{{ values[prop] }}</div>
</template>

<script setup>
import { ref } from 'vue'
const isDisabled = ref(false)
const props = defineProps({
  prop: String,
  values: Object,
  disable: Array,
  formValues: Object,
  tableIndex: String | Number,
  selectable:Function
})

const emits = defineEmits(['value-change'])
const selectChange = (value) => {
  emits('value-change', {
    key: props.prop,
    value: value,
    index: props.tableIndex
  })
}

const judgeDisabled = () => {
  if (Array.isArray(props.disable)) {
    Object.keys(props.disable[0][1]).forEach(item => {
      if (props.disable[0][1][item].indexOf(props.formValues[item]) == -1) {
        isDisabled.value = true
      }
    })
  }
}

judgeDisabled()
</script>