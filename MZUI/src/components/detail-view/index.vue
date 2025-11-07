<template>
  <el-dialog v-model="dialogVisible" :width="detailWidth" :title="_title + '详情'" :close-on-click-modal="false"
    :destroy-on-close="true">
    <div class="detail_box">
      <template v-for="item in _columns">
        <div :class="'detail_' + item.type" v-if="item.type !== 'formtable'">
          <component :is="components[item.type]" v-bind="{ ...item }" :formValues="fromData" :formKey="item.prop"
            :prop="item.prop" no-page @selection-change="selectionChange" :rowBtnsDisable="btnsDisable">
          </component>
        </div>
      </template>
    </div>
    <template v-for="item in _columns">
      <div :class="'detail_' + item.type" v-if="item.type === 'formtable'">
        <component :is="components[item.type]" v-bind="{ ...item }" :formValues="fromData" :formKey="item.prop"
          :prop="item.prop" no-page @selection-change="selectionChange" :rowBtnsDisable="btnsDisable">
        </component>
      </div>
    </template>
    <template #footer>
      <div class="dialog_footer" v-if="detailBnts.length > 0 && showbts">
        <el-button @click="dialogVisible = false">取消</el-button>
        <template v-for="item in detailBnts">
          <el-button @click="emits('detail-submit', item, fromData)" type="primary" v-if="filterBtns(item)"
            :loading="btns[item]">{{ staticDictionary[item] }}</el-button>
        </template>

      </div>
      <div class="dialog_footer" v-else>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import components from './components'
import { staticDictionary } from '../static-dictionary';
import { array } from 'js-md5';
import { useVueToPrint } from "vue-to-print";
import { template } from 'lodash';
defineOptions({
  name: 'MzDetailView'
})

const emits = defineEmits(['detail-submit', 'selection-change'])
const props = defineProps({
  serviceName: String,
  serviceFullPath: String,
  formLayout: Number,
  btnsDisable: Array,
  detailWidth: {
    type: Number,
    default: 900
  },
  detailBnts: {
    type: Array,
    default: () => {
      return []
    }
  },
  printer: {
    default: {
      signArea: [],
      title: ""
    },
    type: Object
  },

})

const showbts = ref(false)

const _title = ref('')

const btns = ref({})

if (props.detailBnts.length > 0) {
  props.detailBnts.forEach(item => {
    btns.value[item] = false
  })

}

const selectionChange = (e) => {
  emits('selection-change', e)
}



const _columns = ref([])
const fromData = ref({})
const showPrintTitle = ref(false)
const printAreaContainer = ref()



const { handlePrint } = useVueToPrint({
  content: printAreaContainer,
  documentTitle: props.printer?.title || '你爹来了',
  bodyClass: 'body',
});
const dialogVisible = ref(false)
const initForm = ({ columns, data, title, showBtns }) => {
  showbts.value = showBtns
  _title.value = title || ''
  _columns.value = columns
  fromData.value = data
  dialogVisible.value = true
}

const filterBtns = (item) => {
  if (Array.isArray(props.btnsDisable)) {
    const find = props.btnsDisable.find(it => it[0] == item)
    if (find) {
      let state = false
      Object.keys(find[1]).forEach(i => {
        if (find[1][i] == fromData.value[i]) {
          state = true
        }
      })
      return state
    }
    else {
      return true
    }
  }
  else {
    return true
  }

}

const setLoading = (type, status) => {
  btns.value[type] = status
}


const closeDetail = () => {
  dialogVisible.value = false
}

defineExpose({
  initForm,
  setLoading,
  closeDetail
})

</script>

<style scoped>
.detail_formtable {
  grid-row: 3;
}

.detail_box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 14px;
}

.detail_formtable {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.title_contaienr {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.print_contaienr {
  margin-top: 5px;
}

.sign-container {
  display: flex;
  flex-wrap: wrap;
  /* 自动换行 */
  margin-top: 20px;
  gap: 10px;
  width: 100%;
}

.sign-item {
  width: calc(25% - 20px);
  /* 一行4个 */
  display: flex;
  align-items: baseline;
  padding: 4px 8px;
  /* 调整一下间距 */
  box-sizing: border-box;
}

.sign-item .label {
  white-space: nowrap;
  margin-right: 6px;
}

.sign-item .underline {
  flex: 1;
  border-bottom: 1px solid #333;
  height: 1px;
}
</style>