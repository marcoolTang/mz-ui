<template>
  <el-dialog v-model="dialogVisible" :width="dialogWidth" :title="title" :close-on-click-modal="false"
    :destroy-on-close="true">
    <formControl ref="formControlRef" :class="['dialog_form', 'form_container_' + dialogWidth]"
      :formLayout="formLayout"></formControl>
    <template #footer>
      <div class="dialog_footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="formSubmit" :loading="loading">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import formControl from '@mz-form-control';
import { nextTick, ref } from 'vue'
import { staticDictionary } from '../static-dictionary'
import { http } from '@http'
defineOptions({
  name: 'MzFormView'
})
const props = defineProps({
  serviceName: String,
  serviceFullPath: String,
  formLayout: Number
})
const loading = ref(false)
const emits = defineEmits(['submit-success'])
const dialogWidth = ref(920)
const formControlRef = ref()
const dialogVisible = ref(false)
const title = ref('')
let _type
const initForm = ({ type, columns, data, parentData, primaryKey }) => {
  _type = type
  if (columns.length > 6) {
    dialogWidth.value = 720
  }
  dialogVisible.value = true
  title.value = staticDictionary[type]
  nextTick(() => {
    formControlRef.value.setFormData({ type, columns, data, parentData, primaryKey })
  })
}
const formSubmit = async () => {
  let formData = await formControlRef.value.validateForm();
  if (!formData) return
  loading.value = true
  let serviceUrl = props.serviceFullPath ?? `/${props.serviceName}/${_type}`
  let { code } = await http[_type == 'update' ? 'put' : 'post'](serviceUrl, formData)
  if (code == 200) {
    emits('submit-success')
    dialogVisible.value = false
  }
  loading.value = false
}

const setDialodWidth = (width) => {
  dialogWidth.value = width
}

defineExpose({
  initForm,
  setDialodWidth
})

</script>