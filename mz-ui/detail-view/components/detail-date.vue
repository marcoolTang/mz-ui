<template>
  <div class="detail_item">
    <div class="detail_title">{{ label }}</div>
    {{ formatTimestamp(formValues[prop]) }}
  </div>
</template>
<script setup>
import { formatTimestamp } from '@utils'

const props = defineProps({
  prop: String,
  formValues: Object,
  label: String
})
</script>