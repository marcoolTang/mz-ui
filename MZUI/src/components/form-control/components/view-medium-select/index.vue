<template>
  <el-image-viewer v-if="isShowImage" @close="closeImgViewer" :url-list="imageList.map(item => item[mediumUrl])"
    :initialIndex="imageIndex">
  </el-image-viewer>
  <div class="viewer_video_box" v-if="isShowVideo">
    <span class="el-image-viewer__btn el-image-viewer__close" @click="isShowVideo = false">
      <el-icon>
        <Close />
      </el-icon>
    </span>
    <video controls :src="videoUrl" class="viewer_video"></video>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'
const props = defineProps({
  fileList: Array,
  mediumUrl: String
})
const imageList = ref([])
const imageIndex = ref(0)
const isShowImage = ref(false)
const isShowVideo = ref(false)
const videoUrl = ref('')

const videoSelect = (data) => {
  isShowVideo.value = true
  videoUrl.value = data[props.mediumUrl]
}

const imageSelect = (item) => {
  imageList.value = props.fileList.filter(it => it.mediumType == 'image')
  imageIndex.value = imageList.value.findIndex(it => it.id == item.id)
  isShowImage.value = true
}

const closeImgViewer = () => {
  isShowImage.value = false
}

defineExpose({
  videoSelect,
  imageSelect
})
</script>

<style scoped>
.viewer_video {
  width: 80%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.8);
  display: block;
}



.viewer_video_box {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 3333;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>