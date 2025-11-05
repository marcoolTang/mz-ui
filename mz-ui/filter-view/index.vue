<template>
  <div class="filter_container" v-if="columns.length > 0">
    <el-form class="component_container" ref="ruleFormRef" :model="formData" :label-width="labelWidth" :inline="inline">
      <div class="form_items">
        <el-form-item :label="column.label" :prop="column.prop" v-for="column in columns">
          <component :is="components[column.type]" v-model="formData[column.prop]" v-bind="column" :disabled="disabled"
            @change="val => handleChange(val, column)" />
        </el-form-item>
      </div>

    </el-form>
    <div class="filter_btns">
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
  </div>

</template>

<script setup>
import { ref, watch } from "vue";
import components from "../form-control/components/index"; // 你已有的组件集合

const props = defineProps({
  columns: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  labelWidth: { type: String, default: "100px" },
});

const emits = defineEmits(["submitForm"]);

const ruleFormRef = ref(null);
const formData = ref({});

// 初始化/重置默认值
const initForm = () => {
  props.columns.forEach((item) => {
    const defaults = {
      select: [],
      switch: false,
      date: null,
      "date-range": [],
    };
    formData.value[item.prop] =
      defaults[item.type] !== undefined ? defaults[item.type] : "";
  });
};

// config 改变时，初始化 formData
watch(
  () => props.columns,
  () => {
    initForm();
  },
  { immediate: true }
);

const onSubmit = () => {
  ruleFormRef.value.validate((valid) => {
    if (!valid) return;
    const query = {};
    props.columns.forEach((item) => {
      const val = formData.value[item.prop];
      if (item.transform) {
        Object.assign(query, item.transform(val));
      } else {
        query[item.prop] = val;
      }
    });
    emits("submitForm", query);
  });
};

const resetForm = () => {
  initForm();
};

const handleChange = (val, column) => {

  formData.value[column.prop] = val;
};

const getFilterData = () => {
  return formData.value
}

defineExpose({
  getFilterData
})
</script>


<style lang="scss" scoped>
.filter_btns {
  display: flex;
}

.form_items {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.form_items :deep(.el-form-item) {
  width: 360px !important;
  margin-right: 16px;

  .el-form-item__label {
    display: flex;
    align-items: center;
    margin: 0 !important;
  }
}

.filter_container {
  display: flex;
  background-color: #ffffff;
  margin-bottom: 8px;
  padding: 16px 16px 0;
  border-radius: 6px;
}

.filter_container .el-form {
  flex: 1;
  width: 0;
}
</style>