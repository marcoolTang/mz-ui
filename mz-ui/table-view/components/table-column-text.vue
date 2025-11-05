<template>
  <div>
    {{ values[prop] }}
  </div>
</template>
<script setup>

const props = defineProps({
  prop: String,
  values:Object
})
</script>