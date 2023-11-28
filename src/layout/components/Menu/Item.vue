<script setup lang="ts">
import path from 'path-browserify';
import { computed } from 'vue';
import { isExternal } from '@/utils';
import type { RouteRecordRaw } from 'vue-router';

const props = defineProps<{
  item: RouteRecordRaw
}>();

const menu = computed<RouteRecordRaw>(() => {
  if (!props.item.children) {
    return props.item;
  }
  
  const children: RouteRecordRaw[] = props.item.children.filter(x => !x.meta || !x.meta.hidden);
  if (children.length === 0) {
    return { ...props.item, children: [] };
  }

  if (children.length === 1) {
    return children[0];
  }

  return { ...props.item, children: children };
});

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.item.path)) {
    return props.item.path;
  }

  return path.resolve(props.item.path, routePath);
}
</script>

<template>
  <ElSubMenu v-if="(menu.children?.length || 0) > 0" :index="menu.path">
    <template #title>
      <ElIcon v-if="menu.meta?.icon">
        <component :is="menu.meta.icon" />
      </ElIcon>
      <span>{{ menu.meta?.title }}</span>
    </template>
    <ElMenuItem v-for="nav in menu.children" :index="resolvePath(nav.path)">
      {{ nav.meta?.title }}
    </ElMenuItem>
  </ElSubMenu>
  
  <ElMenuItem v-else :index="resolvePath(menu.path)">
    <ElIcon v-if="menu.meta?.icon || item.meta?.icon">
      <component :is="menu.meta?.icon || item.meta?.icon" />
    </ElIcon>
    <template #title>{{ menu.meta?.title }}</template>
  </ElMenuItem>
</template>
