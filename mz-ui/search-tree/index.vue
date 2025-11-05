<template>
  <div class="search_tree" v-loading="loading">
    <el-input v-model="filterText" :placeholder="searchPlaceholder" :prefix-icon="Search" />
    <el-tree ref="treeRef" style="max-width: 600px" class="filter-tree" :data="treeData" :props="defaultProps"
      :filter-node-method="filterNode" :node-key="nodeKey" :current-node-key="currentNodeKey" @node-click="nodeClick"
      :default-expanded-keys="[currentNodeKey ?? 0]" />
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { http } from '@http'
const props = defineProps({
  serviceName: String,
  nodeKey: String,
  searchPlaceholder:String
})
const emits = defineEmits(['tree-select-change'])
const treeRef = ref()
const filterText = ref('')
const treeData = ref([])
const loading = ref(false)
const currentNodeKey = ref()
const filterNode = (value, data) => {
  if (!value) return true
  return data[defaultProps.label].includes(value)
}
const defaultProps = {
  children: 'children',
  label: 'dictName',
}
watch(filterText, (val) => {
  treeRef.value.filter(val)
})

const initData = async () => {
  loading.value = true
  let { data } = await http.get('/' + props.serviceName + '/tree')
  treeData.value = data
  loading.value = false
  currentNodeKey.value = data[0][props.nodeKey]
  emits('tree-select-change', data[0].dictType, data[0].dictName)
}

const nodeClick = (e) => {
  emits('tree-select-change', e.dictType, e.dictName)
}

onMounted(() => {
  initData()
})

</script>
<style scoped>
@import './index.css';
</style>