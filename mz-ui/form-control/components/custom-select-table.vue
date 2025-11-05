<template>
  <div style="width: 100%;">
    <el-button size="small" @click="dialogTableVisible = true">选择资产</el-button>
    <el-table :data="tableData" style="width: 100%;margin-top: 8px;">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="goodsCode" label="资产编号" />
      <el-table-column prop="name" label="资产名称" />
      <el-table-column prop="address" label="规格" />
      <el-table-column prop="address" label="数量" />
    </el-table>
    <el-dialog v-model="dialogTableVisible" title="选择资产">
      <el-table :data="dialogTableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="goodsCode" label="资产编号" />
        <el-table-column prop="name" label="资产名称" />
        <el-table-column prop="address" label="规格" />
        <el-table-column prop="address" label="数量" />
      </el-table>
      <template #footer>
        <div class="dialog_footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button @click="selectAsset" type="primary">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>

</template>
<script setup>
import { ref, watch } from 'vue';
import { http } from '@http'

const emits = defineEmits(['update:modelValue'])

const props = defineProps({
  prop: String,
  correlationKey: String,
  formData: Object
})

const current = ref(1)
const dialogTableVisible = ref(false)

const tableData = ref([])

const dialogTableData = ref([])

let selections = []

const handleSelectionChange = (data) => {
  selections = data
}

const selectAsset = () => {
  tableData.value = JSON.parse(JSON.stringify(selections))
  emits('update:modelValue' , tableData.value.map( item => item.id).join(','))
  dialogTableVisible.value = false
}

const initAssetList = async () => {
  if (props.formData[props.correlationKey] == 1) {
    // 固定资产
    const result = await http.get(`/fixed-Goods/page?current=${current.value}&size=10`)
    dialogTableData.value = result.data.records;
  }
  else if (props.formData[props.correlationKey] == 2) {
    // 低值易耗
    const result = await http.get(`/consumable-goods/page?current=${current.value}&size=10`)
    dialogTableData.value = result.data.records;
  }

}

watch(() => props.formData[props.correlationKey], () => {
  tableData.value = []
  initAssetList()
})



</script>