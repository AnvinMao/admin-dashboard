<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, type RouteLocationMatched } from 'vue-router';

interface RouteLink {
  title: string;
  path: string;
}

const route = useRoute();
const breadcrumbs = ref<RouteLink[]>([]);

const initBreadcrumb = () => {
  breadcrumbs.value = [];
  const matched: RouteLocationMatched[] = route.matched.filter(item => item.meta && item.meta.title);
  const first = matched[0];
  if (!isDashboard(first)) {
    breadcrumbs.value.push({
      title: '后台首页',
      path: '/dashboard'
    });
  }

  matched.forEach(item => breadcrumbs.value.push({
    title: item.meta.title as string,
    path: item.path
  }));
}

const isDashboard = (route?: RouteLocationMatched): boolean => {
  if (!route?.name) {
    return false;
  }

  return route.name.toString().trim().toLocaleLowerCase() === 'dashboard';
}

watch(
  () => route.path,
  (path) => {
    if (path.startsWith('/redirect/')) {
      return;
    }

    initBreadcrumb();
  }
);

onBeforeMount(() => initBreadcrumb());
</script>

<template>
  <ElBreadcrumb separator="/">
    <ElBreadcrumbItem v-for="(item, idx) in breadcrumbs" :to="item.path" :key="idx">
      {{ item.title }}
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
