<template>
  <div class="mz_table_box" ref="mzTableBoxRef">
    <div class="table_box" :style="{
      maxHeight: height + 'px'
    }">
      <el-table :data="tableData" v-loading="loading" height="100%" :row-key="rowKey" ref="elTableRef"
        @selection-change="handleSelectionChange" @filter-change="handleFilterChange" :scroll-x="true" :scroll-y="true"
        :border="true" style="width: 100%" :row-class-name="rowClassName">
        <el-table-column type="selection" width="55" selection v-if="selection" :selectable="selectable"
          fixed="left"></el-table-column>

        <el-table-column :label="item.label" :fixed="item.fixed" v-for="item in columns" :key="item.prop"
          :min-width="item.width || 150" :column-key="item.prop" :filters="item.filters"
          :filter-method="item.filterMethod" :filtered-value="item.filteredValue" show-overflow-tooltip>
          <template #default="scope" v-if="item.type !== 'operation-event'">

            <component v-if="item.render" :is="item.render(scope.row, scope.$index)" />
            <component v-else :is="components[item.type]" v-bind="{ ...item }" :values="scope.row"
              :disable="rowBtnsDisable" :selectable="selectable" :formKey="formKey" :table-index="scope.$index"
              :tableData="tableData" :formValues="formValues" @value-change="valueChange($event, scope.row)">
            </component>
          </template>
          <template #default="scope" v-else>
            <div class="op_btn" @click="item.clickEvent(scope.row, scope.$index)">打印</div>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" v-if="rowBtns && rowBtns.length" :width="setWidth(rowBtns)">
          <template #default="scope">
            <div class="op_btns">
              <template v-for="item in rowBtns">
                <div :class="{
                  'op_btn': true,
                  'op_btn_disabled': validateBtns(item, scope.row)
                }" @click="operationEvent(item, scope.row)">
                  {{ staticDictionary[item] }}
                </div>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="!noPage && pageTotal > 0" class="pagination_box" ref="paginationBoxRef">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 15, 20, 50, 100]"
        :small="small" background class="pagination" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, onBeforeUnmount } from "vue";
import { http } from '@http';
import components from './components'
import { setWidth } from './index'
import { staticDictionary } from '../static-dictionary';
import { eventBus } from "@utils";
import { useRoute } from "vue-router";

const paginationBoxRef = ref()
const route = useRoute()
const loading = ref(false)

const emits = defineEmits(['operation-event', 'render-success', 'tab-refresh', 'selection-change'])

const props = defineProps({
  selection: Boolean,
  columns: Array,
  serviceName: String,
  dataType: String,
  rowKey: String,
  rowBtns: Array,
  noPage: Boolean,
  formValues: Object,
  prop: String,
  rowBtnsDisable: Array,
  selectionDisabled: Array,
  formKey: String,
  expandKeys: Array,
  rowClassName: Function || String,
  dataFilter: Function,
  query: Object
});

const tableData = ref([])
const result = ref({})
const mzTableBoxRef = ref()
const elTableRef = ref()
const height = ref('auto')
const currentPage = ref(1)
const pageTotal = ref(1)
const pageSize = ref(50)
const small = ref(false)

// ✅ 新增：保存当前的筛选条件
const currentFilters = ref({})

if (props.formValues) {
  if (props.expandKeys) {
    tableData.value = props.formValues[props.prop].map(item => {
      item[props.expandKeys[1]] = item[props.expandKeys[0]]
      return item
    })
  }
  else {
    tableData.value = props.formValues[props.prop]
  }
}

const handleSelectionChange = (e) => {
  emits('selection-change', e)
}

const valueChange = (item) => {
  tableData.value[item.index][item.key] = item.value
}

const selectable = (row) => {
  if (Array.isArray(props.selectionDisabled) && row) {
    if (props.selectionDisabled[1].indexOf(row[props.selectionDisabled[0]]) !== -1) {
      return false
    }
    else {
      return true
    }
  }
  return true
}

// ✅ 新增：处理列筛选变化
const handleFilterChange = (filters) => {
  console.log('筛选条件变化:', filters)
  currentFilters.value = filters

  // 重置到第一页并重新加载数据
  // currentPage.value = 1
  // resetTable({ current: 1 })
  resetTable()
}

// 初始化数据
const resetTable = async (query = {}) => {
  if (query.size) {
    pageSize.value = query.size
  }
  if (props.serviceName) {
    loading.value = true

    // ✅ 合并筛选条件到请求参数
    const filterParams = {}
    Object.keys(currentFilters.value).forEach(key => {
      const values = currentFilters.value[key]
      if (values && values.length > 0) {
        filterParams[key] = values.join(',')
      }
    })
    // 方法1: 过滤 undefined 和 null
    const cleanParams = Object.fromEntries(
      Object.entries({
        current: query.current ?? currentPage.value,
        size: query.size ?? pageSize.value,
        ...filterParams,
        ...query,
        ...props.query
      }).filter(([_, value]) => value !== undefined && value !== null)
    )
    let { data, records } = await http.get('/' + props.serviceName + '/' + (props.dataType ?? 'page'), {
      params: cleanParams
    })
    result.value = data
    tableData.value = props.dataType == 'tree' ? data : data.records ? data.records : data.list
    if (props.dataFilter) {
      tableData.value = props.dataFilter(tableData.value)
    }
    pageTotal.value = data.total
    loading.value = false

    nextTick(() => {
      emits('render-success')
      const eventName1 = `loadingClass`
      eventBus.emit(eventName1, route.name)
    })
    return Promise.resolve()
  }
}

const validateBtns = (item, data) => {
  if (item == 'delete' && data?.children?.length) return true
  return !judgeDisabled(item, data)
}

const judgeDisabled = (item, tableRow) => {
  if (Array.isArray(props.rowBtnsDisable)) {
    let findBtn = props.rowBtnsDisable.find(i => i[0] == item)
    if (findBtn) {
      let state = false
      Object.keys(findBtn[1]).forEach(i => {
        if (findBtn[1][i].indexOf(tableRow[i]?.value ?? tableRow[i]) != -1) {
          state = true
        }
      })
      return state
    }
    return true
  }
  else {
    return true
  }
}

const operationEvent = (type, data) => {
  if (validateBtns(type, data)) return
  let parentData = tableData.value.find(item => item[props.rowKey] == data.parentId)
  emits('operation-event', type, data, parentData)
}

onMounted(() => {
  setTimeout(() => {
    if (paginationBoxRef.value) {
      height.value = mzTableBoxRef.value.offsetHeight - paginationBoxRef.value.offsetHeight - 16
    }
  }, 0)
})

onBeforeUnmount(() => {
  const eventName1 = `loadingClass:${route.name}`
  const eventName = `refreshTab:${route.name}`
  eventBus.clear(eventName)
  eventBus.clear(eventName1)
})

const handleSizeChange = (val) => {
  const totalPages = Math.ceil(pageTotal.value / val);
  currentPage.value = Math.min(currentPage.value, totalPages) || 1;
  resetTable({ current: currentPage.value, size: val });
}

const handleCurrentChange = (val) => {
  resetTable({ current: val })
}

const getTableData = () => {
  return result.value
}
defineExpose({
  resetTable,
  getTableData
})
</script>

<style scoped>
@import './index.css';

.pagination_box {
  display: flex;
  justify-content: flex-end;
  padding: 16px 14px;
  background-color: #ffffff;
  border-radius: 0 0 6px 6px;
}

.table_box {
  background-color: #ffffff;
  padding: 16px 12px 0;
}
</style>