<template>
  <div class="search_tree" v-loading="loading">
    <el-input v-model="filterText" :placeholder="searchPlaceholder" :prefix-icon="Search" />
    <el-tree ref="treeRef" style="max-width: 600px" class="filter-tree" :data="displayTreeData" :props="defaultProps"
      :filter-node-method="filterNode" :node-key="nodeKey" :current-node-key="currentNodeKey" @node-click="nodeClick"
      :default-expanded-keys="[currentNodeKey ?? 0]" />
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { http } from '@http'

defineOptions({
  name: 'MzSearchTree'
})

const props = defineProps({
  serviceName: String,
  nodeKey: String,
  searchPlaceholder: String,
  treeData: {  // 添加支持外部传入数据
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['tree-select-change'])





const treeRef = ref()
const filterText = ref('')
const internalTreeData = ref([])
const loading = ref(false)
const currentNodeKey = ref()

const filterNode = (value, data) => {
  if (!value) return true
  return data[defaultProps.label].includes(value)
}

const defaultProps = {
  children: 'children',
  label: (data) => data.dictName || data.label || data.name || '未命名节点'
}
const displayTreeData = computed(() => {
  if (props.treeData && props.treeData.length > 0) {
    return props.treeData
  }
  return internalTreeData.value
})
watch(filterText, (val) => {
  treeRef.value?.filter(val)
})

const initData = async () => {
  // 如果外部传入了数据,直接使用
  if (props.treeData && props.treeData.length > 0) {
    currentNodeKey.value = props.treeData[0][props.nodeKey]
    emits('tree-select-change', props.treeData[0].dictType, props.treeData[0].dictName)
    return
  }

  // 如果没有 serviceName,不发起请求
  if (!props.serviceName) {
    console.warn('MzSearchTree: serviceName 或 treeData 必须提供其中之一')
    return
  }

  try {
    loading.value = true
    const { data } = await http.get('/' + props.serviceName + '/tree')

    // 检查返回数据是否有效
    if (!data) {
      console.warn('MzSearchTree: API 返回数据为空')
      internalTreeData.value = []
      return
    }

    if (!Array.isArray(data)) {
      console.warn('MzSearchTree: API 返回数据不是数组格式')
      internalTreeData.value = []
      return
    }

    if (data.length === 0) {
      console.warn('MzSearchTree: API 返回空数组')
      internalTreeData.value = []
      return
    }

    // 数据有效,设置树数据
    internalTreeData.value = data

    // 安全地访问第一个节点
    const firstNode = data[0]
    if (firstNode && props.nodeKey) {
      currentNodeKey.value = firstNode[props.nodeKey]
      emits('tree-select-change', firstNode.dictType, firstNode.dictName)
    }

  } catch (error) {
    console.error('MzSearchTree: 加载树数据失败', error)
    internalTreeData.value = []
  } finally {
    loading.value = false
  }
}

const nodeClick = (e) => {
  if (e) {
    emits('tree-select-change', e.dictType, e.dictName)
  }
}

// 暴露方法供外部调用
const refresh = () => {
  initData()
}

defineExpose({
  refresh,
  initData
})

onMounted(() => {
  initData()
})
</script>

<style scoped>
@import './index.css';
</style>