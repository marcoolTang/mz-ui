<template>
  <div class="detail_item">
    <div class="detail_title">
      {{ label }}:
    </div>
    {{ filterOptions(formValues[prop], options) }}
  </div>
</template>
<script setup>

const props = defineProps({
  prop: String,
  formValues: Object,
  options: Array,
  label: String,
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },
})
const filterOptions = (value, options) => {
  const find = options?.find(item => item[props.optionValue] == value)
  if( find ) return find[props.optionLabel]
  return ''
}
</script>