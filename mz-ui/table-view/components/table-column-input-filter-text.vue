<template>
  <div>{{  }}</div>
</template>

<script setup>
const props = defineProps({
  prop: String,
  values: Object,
})
const emits = defineEmits(['value-change'])
const selectChange = (value) => {
  emits('value-change', {
    key: props.prop,
    value: value
  })
}
</script>