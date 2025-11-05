<template>
  <el-select placeholder="请选择" :modelValue="modelValue" :filterable="filterable" :remote="remote" @change="selectChange"
    :loading="loading" style="width:100%;" :remote-method="remoteMethod" :multiple="multiple">
    <el-option v-for="item in selectOptions" :key="item[optionValue]" :label="item[optionLabel]"
      :value="item[optionValue]">
    </el-option>
  </el-select>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { http } from '@http'
const props = defineProps({
  serviceUrl: String,
  options: Array,
  modelValue: Number | String | Array,
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'value'
  },
  filterable: String,
  remote: String,
  multiple: Boolean
})

const loading = ref(false)
const emits = defineEmits(['update:modelValue'])
const selectOptions = ref(props.options)
const selectChange = (value) => {
  emits('update:modelValue', value)
}


const remoteMethod = async (query) => {
  if (query) {
    loading.value = true
    const result = await http.get(props.serviceUrl + '?page=10&current=1&nickName=' + query);
    loading.value = false
    if (result.code == 200) {
      selectOptions.value = result.data.records
    }
  } else {
    selectOptions.value = []
  }
}


</script>