<template>
  <div class="center">
    <svg width="16" height="16" v-if="values[prop]" style="margin: 0 10px 0 16px;">
      <use v-bind:xlink:href="values[prop]" />
    </svg>
  </div>
</template>
<script setup>

const props = defineProps({
  prop: String,
  values: Object
})

</script>