<template>
  <div class="detail_item">
    <el-table :data="formValues[prop]" style="width: 100%;margin-top: 16px;">
      <el-table-column type="selection" width="55" v-if="selection" />
      <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" :width="item.width">
        <template #default="scope">
          <div v-if="item.type == 'select'">
            {{item.options.find(it => it.value == scope.row[item.prop]).label}}
          </div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
const props = defineProps({
  prop: String,
  formValues: Object,
  label: String,
  columns: Array,
  selection: Boolean
})


</script>
<style scoped>
.detail_item {
  font-size: 14px;
  margin-bottom: 12px;
}

.detail_title {
  width: 100px;
}
</style>