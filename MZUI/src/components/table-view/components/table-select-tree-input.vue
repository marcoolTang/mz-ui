<template>
  <el-tree-select :disabled="!selectable(values)" v-model="treeSelect" :data="treeData" check-strictly :render-after-expand="false" :node-key="nodeKey"
    :props="{
      label: (data, node) => {
        return data.name
      }
    }" />
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { http } from '@http'
const props = defineProps({
  serviceUrl: String,
  prop: String,
  values: Object,
  nodeKey:String,
  tableIndex: String | Number,
  selectable:Function
})
const emits = defineEmits(['value-change'])
const treeLoading = ref(false)

const treeData = ref([])

const treeSelect = ref(props.values[props.prop])

watch(() => treeSelect.value, () => {
  emits('value-change', {
    key: props.prop,
    value: treeSelect.value,
    index:props.tableIndex
  })
})

const init = async () => {
  treeLoading.value = true;
  const result = await http.get(props.serviceUrl);
  treeLoading.value = false;

  if (result.code == 200) {
    treeData.value = result.data
  }

}

onMounted(() => {
  init()
})

</script>