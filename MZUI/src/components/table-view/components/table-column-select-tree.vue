<template>
  <div>
    {{ treeValue }}
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps({
  prop: String,
  values: Object,
  options: Array,
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },

})

const treeValue = ref()
const recursion = (treeArr) => {

  treeArr?.forEach(item => {
    if (item[props.optionValue] == props.values[props.prop]) {
      treeValue.value = item[props.optionLabel]
      return
    }
    if (item.children.length > 0) {
      recursion(item.children)
    }
  })
}


onMounted(() => {
  recursion(props.options)
})

</script>