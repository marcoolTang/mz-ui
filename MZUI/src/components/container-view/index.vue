<template>
  <div class="mz_container">
    <filter-view ref="filterViewRef" :columns="col.filterColumns || []" @submitForm="onFilterSearch"></filter-view>
    <div class="content_table">
      <topBtnsView :topBtns="topBtns" ref="topBtns" v-if="topBtns?.length > 0" @click="topBtnEvent"></topBtnsView>
      <tableView :dataFilter="dataFilter" ref="tableViewRef" :rowKey="primaryKey" :rowBtns="rowBtns"
        :serviceName="serviceName" :dataType="dataType" :columns="col.tableColumns"
        @operation-event="tableOperationEvent" @render-success="renderSuccessHandle" :rowBtnsDisable="btnsDisable"
        :rowClassName="rowClassName" :query="query" :tableData="tableData" :pageTotal="pageTotal"></tableView>
      <slot name="content" v-if="slotVisible"></slot>
    </div>
  </div>
  <formView ref="formViewRef" :formLayout="formLayout" :serviceName="serviceName" @submit-success="formSubmitSuccess">
  </formView>
  <formUpload ref="uploadFormRef" :serviceName="serviceName" @submit-success="formSubmitSuccess"></formUpload>
  <detailView ref="detailViewRef" :detailWidth="detailWidth" :btnsDisable="btnsDisable" :detailBnts="detailBnts"
    @detail-submit="tableOperationEvent" @selection-change="selectionChange"></detailView>
</template>

<script setup>
import formUpload from "./components/upload.vue";
import filterView from '@mz-filter-view'
import tableView from '@mz-table-view'
import topBtnsView from './components/topBtns.vue';
import formView from '@mz-form-view'
import detailView from '@mz-detail-view'
import { columnsHandle, staticColumsHandle } from './data-handle'
import { onMounted, ref, onActivated, nextTick, computed, watch } from 'vue'
import { http } from '@http'
defineOptions({
  name: 'MzContainerView'
})
const props = defineProps({
  columns: Array,
  serviceName: String,
  dataType: String,
  primaryKey: String,
  topBtns: Array,
  rowBtns: Array,
  leftTreeKey: String,
  leftTreeServiceName: String,
  notResetTable: Boolean,
  formLayout: Number,
  detailBnts: Array,
  btnsDisable: Array,
  detailWidth: Number,
  dialogWidth: String,
  rowClassName: Function || String,
  dataFilter: Function,
  query: Object,
  tableData: {
    type: Array,
    default: () => []
  },
  pageTotal: {
    type: Number,
    default: 0
  }
})


const slotVisible = ref(false)
const emits = defineEmits(['btns-event', 'selection-change'])
let tableQuery

// 使用 ref 存储处理后的列配置
const col = ref({
  tableColumns: [],
  filterColumns: [],
  saveColumns: [],
  updateColumns: [],
  detailColumns: []
})
const formViewRef = ref()
const uploadFormRef = ref()
const tableViewRef = ref()
const detailViewRef = ref()
const filterViewRef = ref()


// 初始化列配置
const initColumns = async () => {
  if (!props.columns || props.columns.length === 0) {
    console.warn('columns 为空')
    return
  }

  try {
    // 调用工具函数处理 columns
    col.value = await staticColumsHandle(props.columns)
    console.log('列配置加载完成:', col.value)
  } catch (error) {
    console.error('加载列配置失败:', error)
    ElMessage.error('加载配置失败')
  } finally {
  }
}

// 监听 columns 变化（如果会动态变化）
watch(() => props.columns, (newColumns) => {
  if (newColumns && newColumns.length > 0) {
    initColumns()
  }
}, { deep: true })


const renderSuccessHandle = () => {
  slotVisible.value = true
}

const topBtnEvent = async (type) => {
  if (type == 'template') {
    const result = await http.get('/' + props.serviceName + '/downloadTemplate', {
      responseType: "blob"
    })
    console.log(result)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(result)
    link.download = '申购单.xls'
    link.click()
    ElMessage.success('导出成功！')
    return
  }
  type == 'save' && formViewRef.value.initForm({ type, columns: col.value.saveColumns })
  type == 'import' && uploadFormRef.value.initForm({ type, columns: col.value.saveColumns })
  nextTick(() => {
    if (props.dialogWidth) {
      formViewRef.value.setDialodWidth(props.dialogWidth)
    }
  })
  emits('btns-event', type)
}

const formSubmitSuccess = () => {
  resetTable()
}

const selectionChange = (e) => {
  emits('selection-change', e)
}

const resetTable = async () => {
  return await tableViewRef.value.resetTable({
    ...tableQuery
  })
}


const setColumn = (prop, values) => {
  [...col.value.saveColumns, ...col.value.updateColumns, ...col.value.tableColumns].forEach(item => {
    if (item.prop == prop) {
      Object.assign(item, values)
    }
  })
}

// const initDictionary = async () => {
//   if (props.columns && props.serviceName) {
//     col.value = await columnsHandle(props.columns, props.serviceName)
//   }
// }

const tableOperationEvent = async (type, data, parentData) => {
  if (type == 'detail') {
    detailViewRef.value.initForm({ columns: col.value.detailColumns, data })
    return
  }

  if (type == 'delete') {
    ElMessageBox.confirm(
      '确定后，此数据将无法恢复?',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async () => {
      let { code } = await http.delete('/' + props.serviceName + `/delete?${props.primaryKey}=${data[props.primaryKey]}`)
      code == 200 && resetTable()
    }, () => { })
  }
  type == 'save' && formViewRef.value.initForm({ type, columns: col.value.saveColumns, data, parentData })
  type == 'update' && formViewRef.value.initForm({ type, columns: col.value.updateColumns, data, parentData, primaryKey: props.primaryKey })
  nextTick(() => {
    if (props.dialogWidth) {
      formViewRef.value.setDialodWidth(props.dialogWidth)
    }
  })

  emits('btns-event', type, data, parentData)
}

const setQuery = (query) => {
  tableQuery = query
}

onActivated(() => {
  console.log("进激活")
  // initDictionary()
  // if (props.notResetTable == '') return
  // resetTable()
})

onMounted(async () => {
  console.log("进首次挂载")
  // 先加载列配置
  await initColumns()
  // initDictionary()
  if (props.notResetTable) return

  resetTable()


})

const initDetail = (data, columns, title, showBtns) => {
  detailViewRef.value.initForm({ columns: columns || col.value.detailColumns, data, title, showBtns })
}

const setDetailLoading = (type, status) => {
  detailViewRef.value.setLoading(type, status)
}

const closeDetail = () => {
  detailViewRef.value.closeDetail()
}

const onFilterSearch = (payload) => {
  setQuery(payload)
  resetTable()
}


const getFilterViewData = () => {
  return filterViewRef.value.getFilterData()
}

const getTableData = () => {
  return tableViewRef.value.getTableData()
}

defineExpose({
  initDetail,
  resetTable,
  setColumn,
  setDetailLoading,
  setQuery,
  closeDetail,
  getFilterViewData,
  getTableData
})
</script>

<style scoped>
@import './index.css';
</style>