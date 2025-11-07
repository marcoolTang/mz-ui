<template>
  <div v-for="(item, index) in fileList " :class="{
    'file_item': true,
    'file_item_success': item.uploadResult?.status == 'success' || type == 'select',
    'file_image_bg': item.mediumType == 'image',
    'file_video_bg': item.mediumType == 'video',
    'file_item_small':small == ''
  }">
    <div class="progress_box" v-if="item.progress && item.progress != 100">
      <el-progress type="circle" :percentage="item.progress">
        <template #default="{ percentage }">
          <div class="percentage_value">{{ percentage }}%</div>
          <div class="percentage_label">上传中</div>
        </template>
      </el-progress>
    </div>
    <div class="occlusion">
      <template v-if="item[mediumType].indexOf('image') != -1">
        <div class="icon" @click="selectImage(item)">
          <el-icon>
            <ZoomIn />
          </el-icon>
        </div>
      </template>
      <template v-else>
        <div class="icon player_icon" @click="videoSelect(item)"></div>
      </template>
      <div class="icon icon_delete" @click="removeFile(index)" v-if="type != 'select'">
        <el-icon>
          <Delete />
        </el-icon>
      </div>
    </div>
    
    <template v-if="item.mediumType == 'image'">
      <img :src="item[mediumUrl]" />
    </template>
    <template v-else-if="item.mediumType == 'video'">
      <video :src="item[mediumUrl]"></video>
    </template>
  </div>
  <ViewMediumSelect ref="ViewMediumSelectRef" :medium-url="mediumUrl" :file-list="fileList"></ViewMediumSelect>
</template>

<script setup>
import { ref } from 'vue'
import { Delete, ZoomIn } from '@element-plus/icons-vue'
import ViewMediumSelect from '../view-medium-select/index.vue'
const ViewMediumSelectRef = ref()
defineProps({
  fileList: Array,
  type: String,
  mediumType: String,
  mediumUrl: String,
  small:String
})
const emits = defineEmits(['on-remove'])

const selectImage = (data) => {
  ViewMediumSelectRef.value.imageSelect(data)
}

const videoSelect = ( data ) => {
  ViewMediumSelectRef.value.videoSelect(data)
} 

const removeFile = (index) => {
  emits('on-remove', index)
}
</script>

<style scoped>
:deep(.el-progress__text) {
  color: #ffffff;
}

:deep(.el-progress-circle) {
  width: 90px !important;
  height: 90px !important;
}

.progress_box {
  position: absolute;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-icon) {
  display: block;
}

.player_icon {
  background-image: var(--player_icon);
  width: 18px;
  height: 18px;
  background-size: auto 18px;
  background-repeat: no-repeat;
}

.icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
  font-size: 18px;
  margin: 0 4px;
}

.occlusion {
  z-index: 1;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file_item_success:hover .occlusion {
  opacity: 1;
  transition: all 0.3s;
}

.file_item {
  margin-right: 16px;
  width: 128px;
  height: 128px;
  border-radius: 4px;
  position: relative;
  margin-bottom: 16px;
  overflow: hidden;
}

.file_item_small{
  width: 80px;
  height: 80px;
  margin-bottom: 4px;
}

video,
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.icon_delete {
  position: relative;
  top: -1px;
}

.percentage_label {
  font-size: 12px;
  margin-top: 4px;
}

.percentage_value {
  font-size: 14px;
}

.file_image_bg,
.file_video_bg {
  background-color: #e1e1e1;
}
</style>