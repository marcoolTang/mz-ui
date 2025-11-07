<template>
  <div style="width: 100%;display: flex;flex-direction: column;">
    <div style="position: absolute;top: -35px;left: 80px;">
      <el-button size="small" type="text" @click="dialogTableVisible = true">选择资产</el-button>

    </div>
    <el-table :data="tableData">
      <el-table-column prop="goodsCode" label="资产编号" />
      <el-table-column prop="name" label="资产名称" />
      <el-table-column prop="specification" label="规格" />
      <el-table-column prop="qty" label="数量" width="80" />
      <el-table-column prop="qty" label="原所在地" v-if="middleware == 'assets-transfer'">
        <template #default="scope">
          <formItemSelectTree store="assets-warehouse" nodeLable="name" :disabled="true"
            v-model="tableData[scope.$index].warehouseIds"
            @change="selectTreeChange($event, scope.$index, 'warehouseIds')" nodeKey="id">
          </formItemSelectTree>
        </template>
      </el-table-column>
      <el-table-column prop="qty" label="目标所在地" v-if="middleware == 'assets-transfer'">
        <template #default="scope">
          <formItemSelectTree store="assets-warehouse" nodeLable="name"
            v-model="tableData[scope.$index].targetWarehouseId"
            @change="selectTreeChange($event, scope.$index, 'targetWarehouseId')" nodeKey="id">
          </formItemSelectTree>
        </template>
      </el-table-column>
      <el-table-column prop="useStatus" label="状态" />
      <el-table-column label="操作" width="80">
        <template #default="scope">
          <div @click="removeItem(scope.$index)" style="color: #409eff;cursor: pointer;">移除</div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogTableVisible" title="选择资产" width="900">
      <div style="margin: 0px 0 16px 0;">
        <el-input type="text" v-model="name" placeholder="请输入资产名称" style="width: 200px;"></el-input>
        <el-input type="text" v-model="specification" placeholder="请输入资产规格"
          style="width: 200px;margin-left: 8px;"></el-input>
        <el-button type="primary" style="margin-left: 8px;" @click="search">搜索</el-button>
      </div>


      <el-table :data="dialogTableData" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="goodsCode" label="资产编号" />
        <el-table-column prop="name" label="资产名称" />
        <el-table-column prop="specification" label="规格" />
        <el-table-column prop="qty" label="数量" width="80" />

        <el-table-column prop="useStatus" label="状态" />
      </el-table>
      <div style="height: 16px;"></div>
      <el-pagination layout="prev, pager, next" :total="total" @current-change="currentChange" />
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
import { onMounted, ref, watch } from 'vue';
import { http } from '@http'
import formItemSelectTree from "./form-item-select-tree.vue";
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  prop: String,
  correlationKey: String,
  formData: Object,
  middleware: String
})

const name = ref('')
const specification = ref('')
const total = ref(0)
const current = ref(1)
const dialogTableVisible = ref(false)
const tableData = ref([])
const dialogTableData = ref([])

let selections = []

const handleSelectionChange = (data) => {
  selections = data
}

const removeItem = (index) => {
  tableData.value.splice(index, 1)
  if (props.middleware == 'assets-transfer') {
    emits('update:modelValue', tableData.value.map(item => {
      return {
        goodsId: item.id,
        type: '1',
        targetWarehouseId: item.targetWarehouseId,
        warehouseId: item.warehouseIds
      }
    }))
  }
  else {
    emits('update:modelValue', tableData.value.map(item => item.id).join(','))
  }
}

const selectAsset = () => {
  tableData.value = JSON.parse(JSON.stringify(selections.map(item => {
    item.warehouseIds = parseInt(item.warehouseIds)
    return item
  })))
  if (props.middleware == 'assets-transfer') {
    emits('update:modelValue', tableData.value.map(item => {
      return {
        goodsId: item.id,
        type: '1',
        targetWarehouseId: item.targetWarehouseId,
        warehouseId: item.warehouseIds
      }
    }))
  }
  else {
    emits('update:modelValue', tableData.value.map(item => item.id).join(','))
  }

  dialogTableVisible.value = false
}

const selectTreeChange = (e, index, key) => {
  tableData.value[index][key] = e
  if (props.middleware == 'assets-transfer') {
    emits('update:modelValue', tableData.value.map(item => {
      return {
        goodsId: item.id,
        type: '1',
        targetWarehouseId: item.targetWarehouseId,
        warehouseId: item.warehouseIds
      }
    }))
  }
}

const initAssetList = async () => {
  const result = await http.get(`/fixed-Goods/page?current=${current.value}&size=10&name=${name.value}&specification=${specification.value}`)
  dialogTableData.value = result.data.records;
  total.value = result.data.total
}

const currentChange = (e) => {
  current.value = e
  initAssetList()
}

const search = () => {
  current.value = 1
  initAssetList()
}

onMounted(() => {
  initAssetList()
})


</script>