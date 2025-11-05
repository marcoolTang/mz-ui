<template>
    <el-dialog v-model="dialogVisible" :width="dialogWidth" :title="title" :close-on-click-modal="false"
        :destroy-on-close="true">
        <el-form :model="formData" ref="ruleFormRef" :rules="rules" :validate-on-rule-change="false">
            <el-form-item>
                <el-upload class="upload-demo" drag :auto-upload="false" :on-change="handleFileChange" ref='uploadRef'
                    :on-remove="handleRemove" :before-remove="beforeRemove" :list-type="listType" multiple>
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        在这里拖拽或者 <em>点击上传</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            <!-- jpg/png 文件大小需小于 500kb -->
                        </div>
                        <div class="el-upload__tip">
                            {{ myError }}
                        </div>
                    </template>
                </el-upload>
                <el-progress v-show="uploadProgress > 0" mutiple :text-inside="true" :stroke-width="24"
                    :percentage="uploadProgress" status="success" :indeterminate="true" striped striped-flow
                    :duration="40" class="el_progress" />
            </el-form-item>
            <el-dialog v-model="previewDialogVisible" width="600px">
                <img v-if="previewImage" :src="previewImage" alt="Preview" style="width: 100%;" />
                <p v-else>{{ previewFileName }}</p>
            </el-dialog>
            <slot name="next"></slot>

        </el-form>
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
import { ref, watch } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { http } from '@http'
const emits = defineEmits(['submit-success'])
const uploadRef = ref()
const rules = ref({});
const dialogVisible = ref(false);
const previewDialogVisible = ref(false);
const previewImage = ref(null);
const previewFileName = ref('');
const formData = ref({
    files: []
});
const loading = ref(false)
let _type = null
const props = defineProps({
    listType: {
        default: 'text',
        type: String
    },
    modelValue: {

    },
    title: {
        default: '上传文件',
        type: String
    },
    serviceName: '',
    dialogWidth: '500'
})
const myError = ref("")
const uploadProgress = ref(0);

const formSubmit = async () => {
    if (formData.value.files.length === 0) {
        myError.value = '请先选择文件再提交！';
        return;
    }

    myError.value = ''; // 清空错误状态
    uploadProgress.value = 0; // 重置进度

    const formDataObj = new FormData();
    formData.value.files.forEach((file, index) => {
        // formDataObj.append(`files[${index}]`, file);
        formDataObj.append(`file`, file);
    });

    try {
        let serviceUrl = props.serviceFullPath ?? `/${props.serviceName}/${_type}`
        const response = await http.post(serviceUrl, formDataObj, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                }
            },
        });

        if (response.data?.code !== 200) {
            throw new Error(response?.data?.msg || '上传失败');
        }

        ElMessage.success('文件上传成功！');
        emits('submit-success')
        formData.value.files = []; // 清空已上传文件
    } catch (error) {
        myError.value = error.message || '上传失败';
        console.error('上传失败:', error);
    }
    dialogVisible.value = false
};

const handleFileChange = (file, fileList) => {

    formData.value.files = fileList.map((item) => item.raw);
};


const handlePreview = (file) => {
    if (file.raw.type.startsWith('image/')) {
        previewImage.value = file.url || URL.createObjectURL(file.raw);;
        previewFileName.value = '';
    } else {
        previewImage.value = null;
        previewFileName.value = file.name;
    }
    previewDialogVisible.value = true;
};

const handleRemove = (file, fileList) => {
    formData.value.files = fileList.map((item) => item.raw);
};
const beforeRemove = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(`取消上传 ${uploadFile.name} ?`).then(
        () => true,
        () => false
    );
};

watch(previewDialogVisible, (visible) => {
    if (!visible && previewImage.value) {
        URL.revokeObjectURL(previewImage.value);
        previewImage.value = null;
    }
});

const initForm = ({ type }) => {
    dialogVisible.value = true
    _type = type
    uploadProgress.value = 0
}

defineExpose({
    dialogVisible,
    formData,
    formSubmit,
    handlePreview,
    initForm
});
</script>

<style scoped>
.view_form {
    padding: 20px;
}

.upload-demo {
    width: 100%;
}

:deep(.el-form-item__content) {
    justify-content: flex-end;
}

.el_progress {
    width: 100%;
}
</style>