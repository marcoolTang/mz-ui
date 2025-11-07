<template>
  <div class="check_tree">
    <el-scrollbar height="200" style="width: calc(100% - 2px);padding: 1px;">
      <el-tree show-checkbox ref="treeRef" default-expand-all :default-expanded-keys="[0]" :data="treeData"
        :check-strictly="false" :props="defaultProps" :node-key="primaryKey" @check="handleCheckChange"
        :default-checked-keys="defaultCheckedKeys" />
    </el-scrollbar>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'

import { http } from '@http'
const treeRef = ref()
const props = defineProps({
  serviceName: String,
  primaryKey: String,
  modelValue: String | Number
})
const loading = ref(false)
const defaultCheckedKeys = ref([])
const treeData = ref([])
const defaultProps = {
  children: 'children',
  label: 'menuName',
}

const emits = defineEmits(['update:modelValue'])

const initData = async () => {
  loading.value = true
  let { data } = await http.get('/' + props.serviceName + '/tree')
  treeData.value = data
  if (props.modelValue) {
    defaultCheckedKeys.value = props.modelValue
  }
  loading.value = false
}

const handleCheckChange = (e) => {
  emits('update:modelValue', treeRef.value.getCheckedNodes(false, true).map(item => item.menuId))
}
onMounted(() => {
  initData()
})

</script>

<style scoped>
@import '../index.css';
</style>