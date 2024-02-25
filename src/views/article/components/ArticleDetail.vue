<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { labelPosition } from '@/utils';
import type { FormInstance, FormRules } from 'element-plus';
import SingleUploadVue from '@/components/Upload/SingleUpload.vue';
import Editor from '@/components/Editor/index.vue';

interface Article {
  id: number;
  title: string;
  picture: string;
  content: string;
}

const loading = ref<boolean>(false);
const props = defineProps<{ edit: boolean }>();
const postForm = ref<FormInstance>();
const params = reactive<Article>({
  id: 0,
  title: '',
  picture: '',
  content: ''
});

const validateContent = (rule: any, value: string, callback: any) => {
  const val: string = value.replace(/<[^>]+>/g, '');
  if (!val) {
    callback(new Error('请输入文章内容'));
  }
  callback();
}

const rules = ref<FormRules<Article>>({
  title: [
    { required: true, message: '请输入文章标题', trigger: 'blur' },
    { min: 3, max: 18, message: '标题为3-18个字符', trigger: 'blur' }
  ],
  picture: [
  { required: true, message: '请上传图片', trigger: 'change' },
  ],
  content: [
    { required: true, trigger: 'change', validator: validateContent }
  ]
});

const submitData = () => {
  if (loading.value) {
    return;
  }

  postForm.value?.validate(valid => {
    if (!valid) {
      return;
    }

    loading.value = true;
    if (props.edit) {
      //update article.
    } else {
      //new article.
    }
  });
}

const route = useRoute();
onMounted(() => {
  if (props.edit) {
    const id = parseInt(route.params.id as string);
    console.log(id);
    // get article detail by id.
  }
});
</script>

<template>
  <section>
    <ElForm ref="postForm" :model="params" :rules="rules" :label-position="labelPosition()" label-width="90px">
      <ElFormItem label="文章标题" prop="title">
        <ElInput v-model="params.title" maxlength="18" />
      </ElFormItem>
      <ElFormItem label="封面图片" prop="picture">
        <SingleUploadVue @uploaded="(url: string) => {
          params.picture = url;
        }" />
      </ElFormItem>
      <ElFormItem label="文章内容" prop="content">
        <Editor v-model:html="params.content" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="submitData" :loading="loading">
          确认
        </ElButton>
      </ElFormItem>
    </ElForm>
  </section>
</template>