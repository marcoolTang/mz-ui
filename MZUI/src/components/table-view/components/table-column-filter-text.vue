<template>
  <div>
    {{ filter(values) }}
  </div>
</template>
<script setup>
const props = defineProps({
  prop: String,
  values:Object,
  filter: Function
})
</script>