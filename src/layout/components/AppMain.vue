<script setup lang="ts">
import { useTagsStore } from '@/stores/tags';

const tagsStore = useTagsStore();
</script>

<template>
  <main>
    <RouterView v-slot="{ Component, route }">
      <KeepAlive :include="tagsStore.cachedViews">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </RouterView>
  </main>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-top: 83px;
}
</style>
