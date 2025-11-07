<template>
  <div>
    {{ filteredLabel }}
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";


const props = defineProps({
  prop: String,
  values: Object,
  options: Array,
  optionLabel: { type: String, default: "label" },
  optionValue: { type: String, default: "value" },
  cb: Function,
  multiple: Boolean,
  serviceUrl: String
});



const filteredLabel = computed(() => {
  debugger
  const value = props.values?.[props.prop];
  if (!props.options?.length) return "";

  const find = props.options.find(
    (item) => item[props.optionValue] == value
  );
  return find ? find[props.optionLabel] : "";
});


</script>
