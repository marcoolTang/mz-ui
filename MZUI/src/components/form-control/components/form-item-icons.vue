<template>
  <el-select :modelValue="modelValue" @change="selectChange">
    <el-option-group>
      <el-option v-for="item in iconsList" class="icons_element_select" :value="item">
        <svg width="16" height="16">
          <use v-bind:xlink:href="item" />
        </svg>
      </el-option>
    </el-option-group>

  </el-select>
</template>

<script setup>
import * as iconsElement from '@icons-element'
import { ref, onMounted } from 'vue'
import { useIconsStore } from '@/store/index.js'
import { storeToRefs } from 'pinia'
const useIcons = useIconsStore()
const { iconsList } = storeToRefs(useIcons)
const emits = defineEmits(['update:modelValue'])
defineProps({
  modelValue: String
})
const iconsElementRef = ref()

const selectChange = (e) => {
  emits('update:modelValue', e)
}

</script>
<style scoped>
@import '../index.css';
</style>