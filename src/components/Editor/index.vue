<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { onBeforeUnmount, shallowRef, ref } from 'vue';
import type { IEditorConfig } from '@wangeditor/editor';
import { uploadFile } from '@/api/file';
import type { IToolbarConfig } from '@wangeditor/editor';

const props = defineProps<{ html: string }>();
const emits = defineEmits(['update:html']);
const htmlValue = ref<string>(props.html);

const mode: 'simple' | 'default' = 'simple';
const editorRef = shallowRef();

const toolbarConfig: Partial<IToolbarConfig> = {
  excludeKeys: ['fullScreen']
};

const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      customUpload(file: File, insertFn: Function) {
        uploadFile(file).then(res => {
          insertFn(res.url);
        })
      }
    }
  }
};

const handleCreated = (editor: any) => editorRef.value = editor;

const handleChanged = (editor: any) => {
  emits('update:html', editor.getHtml());
}

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<template>
  <div class="wrapper">
    <Toolbar
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
      class="toolbar"
    />
    <Editor
      id="editor"
      v-model="htmlValue"
      :mode="mode"
      :default-config="editorConfig"
      @on-change="handleChanged"
      @on-created="handleCreated"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  .toolbar {
    border-bottom: 1px solid var(--el-border-color);
  }
  #editor {
    position: relative;
    min-height: 350px;
  }
}
::v-deep(.w-e-text-placeholder) {
  top: 10px;
}
::v-deep(.w-e-toolbar) {
  align-items: center;
  background-color: #F5F7FA;
  .w-e-bar-divider {
    height: 15px;
  }
}
</style>