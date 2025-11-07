<template>
  <div class="form_table">
    <div class="form_table_titls">
      <div v-for="item in columns" class="column" :style="{
        width: item.width + 'px',
        flex: item.width ? 'none': 1
      }">
        <span v-if="item.required">*</span>
        {{ item.label }}
      </div>
      <div class="btn_box"></div>
    </div>
    <el-scrollbar style="flex: 1;height: 0;">
      <div v-for="(item, index) in formData" class="formtable_item">
        <div v-for="it in columns" class="column" :style="{
          width: it.width + 'px',
          flex: it.width ? 'none': 1
        }">
          <el-form-item :prop="prop + '.' + index + '.' + it.prop" :rules="it.required ? {
            required: true,
            message: '必填',
            trigger: 'blur',
          } : null">
            <component :is="components[it.type]" v-model="item[it.prop]" v-bind="{ ...it }" :formData="formData"
              :itemIndex="index">
            </component>
          </el-form-item>
        </div>
        <div class="btn_box table_row_btn">
          <div class="icon_del" @click.stop="delItem(index)" v-if="formData.length > 1">
          </div>
          <div class="icon_add" @click.stop="addItem" v-if="index == (formData.length - 1)">
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import components from './index'
import { ref, watch } from 'vue'
const props = defineProps({
  modelValue: Array,
  columns: Array,
  prop: String
})

const formData = ref([{}])
const emits = defineEmits(['update:modelValue'])

watch(() => formData.value, () => {
  emits('update:modelValue', formData.value)
}, {
  deep: true
})
let itemForm = {}

const addItem = () => {
  formData.value.push(JSON.parse(JSON.stringify(itemForm)))
}

const delItem = (index) => {
  formData.value.splice(index, 1)
}

if (props.modelValue) {
  formData.value = props.modelValue
}

if (props.columns) {
  props.columns.forEach(item => {
    itemForm[item.prop] = ''
  })
}

</script>
<style scoped>
@import '../index';

:deep(.formtable_item) {
  padding: 0;
}

.formtable_item {
  display: flex;
  width: 100%;
  margin-bottom: 6px;
}

.column {
  flex: 1;
  width: 0;
  margin: 0 8px;
}

.form_table {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.form_table_titls {
  display: flex;
  background-color: #F7F8FA;
  margin-bottom: 16px;
}

.btn_box {
  width: 70px;

}

.table_row_btn {
  display: flex;
  align-items: center;
  height: 32px;
}
</style>