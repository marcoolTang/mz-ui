<template>
  <div class="detail_item">
    <div class="detail_title">{{ label }}:</div>
    {{ filter(formValues) }}
  </div>
</template>
<script setup>

const props = defineProps({
  prop: String,
  formValues: Object,
  label: String,
  filter: Function
})
</script>