# 搜索树示例

MzSearchTree 是一个带搜索功能的树形组件。

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const treeData = ref([
  {
    id: 1,
    dictName: '一级节点 A',
    dictType: 'type1',
    children: [
      { id: 2, dictName: '二级节点 A-1', dictType: 'type2' },
      { id: 3, dictName: '二级节点 A-2', dictType: 'type3' }
    ]
  },
  {
    id: 4,
    dictName: '一级节点 B',
    dictType: 'type4',
    children: [
      { id: 5, dictName: '二级节点 B-1', dictType: 'type5' },
      { id: 6, dictName: '二级节点 B-2', dictType: 'type6' }
    ]
  }
])

const handleTreeSelect = (dictType, dictName) => {
  console.log('选中节点:', { dictType, dictName })
  ElMessage.success(`选中: ${dictName}`)
}
</script>

<div style="padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); min-height: 400px;">
  <mz-search-tree 
    :tree-data="treeData" 
    node-key="id" 
    search-placeholder="搜索节点"
    @tree-select-change="handleTreeSelect" 
  />
</div>

## 代码示例

```vue
<template>
  <mz-search-tree 
    :tree-data="treeData" 
    node-key="id" 
    search-placeholder="搜索节点"
    @tree-select-change="handleTreeSelect" 
  />
</template>

<script setup>
import { ref } from 'vue'

const treeData = ref([
  {
    id: 1,
    dictName: '一级节点',
    dictType: 'type1',
    children: [
      { id: 2, dictName: '二级节点 1', dictType: 'type2' },
      { id: 3, dictName: '二级节点 2', dictType: 'type3' }
    ]
  }
])

const handleTreeSelect = (dictType, dictName) => {
  console.log('选中:', dictType, dictName)
}
</script>
```
