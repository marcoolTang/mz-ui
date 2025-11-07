<template>
  <div class="mz_table_box" ref="mzTableBoxRef">
    <div class="table_box">
      <el-table :data="displayTableData" v-loading="loading" height="100%" :row-key="rowKey" ref="elTableRef"
        @selection-change="handleSelectionChange" @filter-change="handleFilterChange" :border="true" style="width: 100%"
        :row-class-name="rowClassName">
        <el-table-column v-if="selection" type="selection" width="55" :selectable="selectable" fixed="left" />

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


        <el-table-column v-if="rowBtns && rowBtns.length" fixed="right" label="操作" :width="setWidth(rowBtns)">
          <template #default="scope">
            <div class="op_btns">
              <div v-for="item in rowBtns" :key="item" :class="{
                'op_btn': true,
                'op_btn_disabled': validateBtns(item, scope.row)
              }" @click="operationEvent(item, scope.row)">
                {{ staticDictionary[item] || item }}
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-if="!noPage && displayPageTotal > 0" class="pagination_box" ref="paginationBoxRef">
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 15, 20, 50, 100]"
        :small="small" background class="pagination" layout="total, sizes, prev, pager, next, jumper"
        :total="displayPageTotal" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, computed, watch } from "vue";
import { http } from '@http';
import { setWidth } from './index'
import { staticDictionary } from '../static-dictionary';
import components from './components'
defineOptions({
  name: 'MzTableView'
})

const paginationBoxRef = ref()
const loading = ref(false)

const emits = defineEmits(['operation-event', 'render-success', 'selection-change', 'value-change'])

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
  rowClassName: [Function, String],
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
});

const internalTableData = ref([])
const result = ref({})
const mzTableBoxRef = ref()
const elTableRef = ref()
const currentPage = ref(1)
const internalPageTotal = ref(0)
const pageSize = ref(50)
const small = ref(false)
const currentFilters = ref({})

// 计算属性
const displayTableData = computed(() => {
  if (props.tableData && props.tableData.length > 0) {
    return props.tableData
  }
  return internalTableData.value
})

const displayPageTotal = computed(() => {
  if (props.pageTotal > 0) {
    return props.pageTotal
  }
  return internalPageTotal.value
})

// 监听数据变化
watch(() => props.tableData, (newVal) => {
  if (newVal && newVal.length > 0) {
    console.log('✅ MzTableView: 使用外部传入的数据', newVal)
  }
}, { immediate: true })

// 调试信息
console.log('=== MzTableView 初始化 ===')
console.log('columns:', props.columns)
console.log('tableData:', props.tableData)
console.log('displayTableData:', displayTableData.value)

// 初始化内部数据
if (props.formValues) {
  if (props.expandKeys) {
    internalTableData.value = props.formValues[props.prop].map(item => {
      item[props.expandKeys[1]] = item[props.expandKeys[0]]
      return item
    })
  } else {
    internalTableData.value = props.formValues[props.prop]
  }
}

const handleSelectionChange = (e) => {
  emits('selection-change', e)
}

const valueChange = (item) => {
  if (props.tableData && props.tableData.length > 0) {
    emits('value-change', item)
  } else {
    internalTableData.value[item.index][item.key] = item.value
  }
}

const selectable = (row) => {
  if (Array.isArray(props.selectionDisabled) && row) {
    if (props.selectionDisabled[1].indexOf(row[props.selectionDisabled[0]]) !== -1) {
      return false
    }
    return true
  }
  return true
}

const handleFilterChange = (filters) => {
  console.log('筛选条件变化:', filters)
  currentFilters.value = filters
  resetTable()
}

// 初始化数据
const resetTable = async (query = {}) => {
  // 外部数据模式
  if (props.tableData && props.tableData.length > 0) {
    console.log('✅ MzTableView: 外部数据模式，跳过请求')
    return Promise.resolve()
  }

  if (query.size) {
    pageSize.value = query.size
  }

  if (props.serviceName) {
    loading.value = true

    try {
      const filterParams = {}
      Object.keys(currentFilters.value).forEach(key => {
        const values = currentFilters.value[key]
        if (values && values.length > 0) {
          filterParams[key] = values.join(',')
        }
      })

      const cleanParams = Object.fromEntries(
        Object.entries({
          current: query.current ?? currentPage.value,
          size: query.size ?? pageSize.value,
          ...filterParams,
          ...query,
          ...props.query
        }).filter(([_, value]) => value !== undefined && value !== null)
      )

      let { data } = await http.get('/' + props.serviceName + '/' + (props.dataType ?? 'page'), {
        params: cleanParams
      })

      result.value = data
      internalTableData.value = props.dataType == 'tree' ? data : data.records ? data.records : data.list

      if (props.dataFilter) {
        internalTableData.value = props.dataFilter(internalTableData.value)
      }

      internalPageTotal.value = data.total
      loading.value = false

      nextTick(() => {
        emits('render-success')
      })
    } catch (error) {
      console.error('❌ MzTableView: 加载数据失败', error)
      loading.value = false
    }

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
  return true
}

const operationEvent = (type, data) => {
  if (validateBtns(type, data)) return
  let parentData = displayTableData.value.find(item => item[props.rowKey] == data.parentId)
  emits('operation-event', type, data, parentData)
}

const handleSizeChange = (val) => {
  const totalPages = Math.ceil(displayPageTotal.value / val);
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

.mz_table_box {
  width: 100%;
  min-height: 400px;
}

.pagination_box {
  display: flex;
  justify-content: flex-end;
  padding: 16px 14px;
  background-color: #ffffff;
  border-radius: 0 0 6px 6px;
}

.table_box {
  background-color: #ffffff;
  padding: 16px 12px;
}
</style>