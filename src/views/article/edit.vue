<script setup lang="ts">
import ArticleDetail from './components/ArticleDetail.vue';

defineOptions({
  name: 'EditArticle',
  inheritAttrs: false
});
</script>

<template>
  <div class="content">
    <ArticleDetail :edit="true" />
  </div>
</template>