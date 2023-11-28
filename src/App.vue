<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import zh from 'element-plus/es/locale/lang/zh-cn';

const store = useAppStore();
</script>

<template>
  <ElConfigProvider :locale="zh" :size="store.size">
    <RouterView />
  </ElConfigProvider>
</template>
