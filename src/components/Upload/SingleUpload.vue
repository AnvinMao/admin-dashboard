<script setup lang="ts">
import { uploadFile } from '@/api/file';
import { ElIcon, ElMessage, type UploadRawFile, type UploadRequestOptions } from 'element-plus';
import { ref } from 'vue';

const emits = defineEmits<{
  uploaded: [url: string]
}>();
const imageUrl = ref<string>();
const loading = ref<boolean>(false);

const handleUpload = (options: UploadRequestOptions): Promise<void> => {
  loading.value = true;
  imageUrl.value = '';
  return new Promise((resolve, reject) => {
    uploadFile(options.file).then(res => {
      imageUrl.value = res.url;
      emits('uploaded', res.url);
      resolve();
    }).catch(() => {
      ElMessage.error('文件上传失败');
      reject();
    }).finally(() => loading.value = false);
  });  
}

const checkFile = (file: UploadRawFile): boolean => {
  if (file.size > 2 * 1024 * 1024) {
    ElMessage.warning('上传的文件不能大于 2M');
    return false;
  }

  return true;
}
</script>

<template>
  <ElUpload
    class="uploader"
    :show-file-list="false"
    :befault-upload="checkFile"
    :http-request="handleUpload"
  >
    <ElImage v-if="imageUrl" :src="imageUrl" fit="cover" />
    <ElIcon v-else-if="loading">
      <IconLoading class="loading" />
    </ElIcon>
    <ElIcon v-else><IconAdd /></ElIcon>
  </ElUpload>
</template>

<style lang="scss" scoped>

.uploader {
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: inline-block;
  .el-image {
    height: 100px;
    width: auto;
  }
  .el-icon {
    width: 100px;
    height: 100px;
    color: #8c939d;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  .loading {
    animation: loading-rotate 1s linear infinite;
  }
}
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>