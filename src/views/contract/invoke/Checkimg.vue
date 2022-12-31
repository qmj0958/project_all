<template>
    <el-upload v-model:file-list="fileList" action="http://123.60.97.40/uploadcheckimg" list-type="picture-card"
        name="pictures" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess"
        :before-upload="beforeUpload">
        <el-icon>
            <Plus />
        </el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
//导入消息框
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([])
//放大图片地址
const dialogImageUrl = ref('')
//是否显示放大对话框
const dialogVisible = ref(false)
//删除方法
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}
//浏览方法
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
//上传完成
const handleSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    //   imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
//上传之前
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //图片格式数组
    let types = ['image/jpeg', 'image/JPG', 'image/png']
    // if (rawFile.type !== 'image/jpeg') {
    if (!types.includes(rawFile.type)) {
        ElMessage.error('只能上传jpg和png格式的图片!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 3) {
        ElMessage.error('上传图片的大小不能超过 3MB!')
        return false
    }
    return true
}
</script>