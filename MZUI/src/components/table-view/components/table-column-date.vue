<template>
  <div>
    {{ formatTimestamp(values[prop]) }}
  </div>
</template>
<script setup>
import { formatTimestamp } from '@utils'
const props = defineProps({
  prop: String,
  values:Object
})
</script>