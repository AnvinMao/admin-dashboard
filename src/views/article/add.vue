<script setup lang="ts">
import ArticleDetail from './components/ArticleDetail.vue';

defineOptions({
  name: 'AddArticle',
  inheritAttrs: false
});
</script>

<template>
  <div class="content">
    <ArticleDetail :edit="false" />
  </div>
</template>