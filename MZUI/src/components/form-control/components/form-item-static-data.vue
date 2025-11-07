<template>
  <div class="static_data_box">
    {{ showText }}
  </div>
</template>

<script setup>
const props = defineProps({
  showText:String
})

</script>

<style scoped>
  @import '../index';
</style>