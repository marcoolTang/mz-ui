<template>
  <div class="container_view_btns">
    <el-button :icon="topBtnsDictionary[item].icon" v-for="item in topBtns" @click="btnEvent(item)"
      :loading="topLoadings[item.type]" :type="topBtnsDictionary[item].type">{{
        topBtnsDictionary[item].label }}</el-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { topBtnsDictionary } from '../../static-dictionary';
const props = defineProps({
  topBtns: {
    type: Array,
    default: () => {
      return []
    }
  },
})
const emits = defineEmits(['click'])
const btnEvent = data => emits('click', data);
const topLoadings = ref(props.topBtns?.map(item => {
  return {
    [item.type]: false
  }
}))
const setBtnsLoading = (type, value) => {
  topLoadings[type] = value
}
defineExpose({
  setBtnsLoading
})

</script>

<style scoped>
@import '../index.css';
</style>