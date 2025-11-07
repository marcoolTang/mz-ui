<template>
  <div>
    <el-tag type="danger">{{ prevText }}{{ values[prop] }}</el-tag>
  </div>
</template>
<script setup>

const props = defineProps({
  prop: String,
  values: Object,
  prevText: String
})
</script>