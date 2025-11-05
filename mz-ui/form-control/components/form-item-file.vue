<template>
  <div class="file-image">
    <input type="file" ref="inputFileRef" @change="fileChange" v-show="false" />
    <ViewMedium :file-list="fileList" medium-type="mediumType" medium-url="staticUrl" @on-remove="fileRemove">
    </ViewMedium>
    <div class="upload-box" @click="fileClick" v-if="props.multiple ? true : fileList.length == 0"></div>
  </div>
</template>
<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import { http } from '@http'
import ViewMedium from './view-medium/index.vue'
const emits = defineEmits(['file-change', 'element-change'])
const inputFileRef = ref()
const fileList = ref([])
const props = defineProps({
  multiple: Boolean,
  modelValue: String,
  prop: String,
})
if (props.modelValue) {

  fileList.value = [{
    staticUrl: props.modelValue,
    mediumType: 'image',
    uploadResult: {
      status: 'success',
      url: props.modelValue,

    }
  }]
}

const fileChange = async (e) => {
  const formData = new FormData()
  let fTarget = e.target.files[0]
  if (fTarget) {
    let file = {
      staticUrl: URL.createObjectURL(fTarget),
      url: URL.createObjectURL(fTarget),
      file: fTarget,
      mediumType: fTarget.type.split('/')[0],
      $index: fileList.value.length,
      progress: 0,
      uploadResult: {}
    }
    fileList.value.push(file)
    formData.append('file', fTarget)
    let result = await http.post('/file/upload', formData, {
      onUploadProgress: (progressEvent) => {
        fileList.value[file.$index].progress = Math.round((progressEvent.loaded * 98) / progressEvent.total);
      },
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded'
      }
    })
    if (result.code == 200) {
      fileList.value[file.$index].uploadResult = {
        status: 'success',
        url: result.msg,
        name: result.msg
      }
      fileList.value[file.$index].progress = 100
      emits('update:modelValue', fileList.value[0].uploadResult.url)
    }
    else {
      // fileList.value.splice(file.$index , 1)
    }
  }
}

const fileRemove = (index) => {
  fileList.value.splice(index, 1)
  emits('file-change', fileList.value)
}
const fileClick = () => {
  inputFileRef.value.click()
}

watch(() => fileList.value, () => {
  nextTick(() => {
    emits('element-change')
  })
}, { deep: true })

</script>
<style scoped>
.close-ico {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 555;
  cursor: pointer;
}


.upload-box {
  --upload_icon: url("data:image/svg+xml,%3Csvg class='icon' viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cpath d='M896 629.333c-17.067 0-32 14.934-32 32V832c0 6.4-4.267 10.667-10.667 10.667H170.667c-6.4 0-10.667-4.267-10.667-10.667V661.333c0-17.066-14.933-32-32-32s-32 14.934-32 32V832c0 40.533 34.133 74.667 74.667 74.667h682.666C893.867 906.667 928 872.533 928 832V661.333c0-17.066-14.933-32-32-32z' fill='%23666'/%3E%3Cpath d='M322.133 407.467L480 249.6V704c0 17.067 14.933 32 32 32s32-14.933 32-32V247.467l157.867 157.866c6.4 6.4 14.933 8.534 23.466 8.534s17.067-2.134 23.467-8.534c12.8-12.8 12.8-32 0-44.8L535.467 147.2c-12.8-12.8-32-12.8-44.8 0L277.333 360.533c-12.8 12.8-12.8 32 0 44.8 10.667 12.8 32 12.8 44.8 2.134z' fill='%23666'/%3E%3C/svg%3E");
  width: 128px;
  height: 128px;
  border: 1px dashed #c1c1c1;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-image: var(--upload_icon);
  background-size: 40px;
  background-repeat: no-repeat;
  background-position: center;
}

i {
  font-size: 40px;
  color: #c1c1c1;
}

img {
  width: 128px;
  height: 128px;
  object-fit: cover;
  border-radius: 4px;
  overflow: hidden;
}

.item {
  position: relative;
  margin-right: 10px;
}

.el-image-1 {
  width: 128px;
  height: 128px;
}
</style>