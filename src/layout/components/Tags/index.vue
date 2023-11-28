<script setup lang="ts">
import path from 'path-browserify';
import { nextTick, onMounted, ref, toRefs, watch } from 'vue';
import { type ElScrollbar } from 'element-plus';
import { useRoute, type RouteRecordRaw, useRouter } from 'vue-router';
import { useRouteStore } from '@/stores/route';
import { useTagsStore, type TagView } from '@/stores/tags';

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();
const currentTag = ref<TagView>();
const route = useRoute();
const router = useRouter();
const store = useTagsStore();
const routeStore = useRouteStore();
const { visitedViews } = toRefs(store);

const addTags = () => {
  if (route.name) {
    store.addView(route);
    const current = visitedViews.value.find(item => item.fullPath === route.fullPath);
    if (current) {
      currentTag.value = current;
    }
  }
}

const moveToCurrentTag = () => {
  nextTick(() => {
    const index = visitedViews.value.findIndex(item => item.fullPath === route.fullPath);
    if (index > -1) {
      //////////////////粗略计算//////////////////
      scrollbarRef.value?.setScrollLeft(index * 93);
    }
  });
}

const showTagsView = (view: TagView) => {
  router.push({ path: view.path, query: view.query });
}

const showLastTags = () => {
  const length: number = visitedViews.value.length;
  if (length === 0) {
    router.push({ path: '/' });
  } else {
    const tag = visitedViews.value[length - 1];
    showTagsView(tag);
  }
}

const closeTagsView = (view: TagView) => {
  store.closeView(view);
  if (view.fullPath === route.fullPath) {
    showLastTags();
  }
}

const handleTags = (command: string) => {
  if (!currentTag.value) {
    return;
  }

  switch (command) {
    case 'close':
      closeTagsView(currentTag.value);
      break;
    case 'closeLeft':
      store.closeSideView(currentTag.value, true);
      break;
    case 'closeRight':
      store.closeSideView(currentTag.value, false);
      break;
    case 'closeOther':
      store.closeOtherView(currentTag.value);
      break;
    case 'closeAll':
      store.closeAllView();
      showLastTags();
      break;
  }
}

const handleRefresh = () => {
  if (!currentTag.value) {
    return;
  }

  store.closeCachedView(currentTag.value);
  const { path, query } = currentTag.value;
  nextTick(() => {
    router.replace({ path: "/redirect" + path, query: query }).catch((err) => {
      console.warn(err);
    });
  });
}

const affixTagsFilter = (routes: RouteRecordRaw[], basePath: string): TagView[] => {
  let tags: TagView[] = [];
  routes.forEach(item => {
    if (item.meta?.affix) {
      const tagPath = path.resolve(basePath, item.path);
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: item.name,
        meta: { ...item.meta },
      });
    }

    if (item.children) {
      const childTags: TagView[] = affixTagsFilter(item.children, item.path);
      if (childTags.length >= 1) {
        tags = tags.concat(childTags);
      }
    }
  });

  return tags;
}

const initTags = () => {
  const tags: TagView[] = affixTagsFilter(routeStore.routes, '/');
  tags.forEach(tag => {
    if (tag.name) {
      store.addVisitedView(tag);
    }
  });
}

const isFirstView = (): boolean => {
  if (visitedViews.value.length === 0) {
    return false;
  }

  return currentTag.value?.fullPath === visitedViews.value[0].fullPath;
}

const isLastView = (): boolean => {
  const length = visitedViews.value.length;
  if (length === 0) return false;
  return currentTag.value?.fullPath === visitedViews.value[length - 1].fullPath;
}

watch(route, () => {
    addTags();
    moveToCurrentTag();
  },
  { immediate: true }
);

onMounted(() => initTags());
</script>

<template>
  <div class="tags-container flex-row center-y">
    <ElScrollbar ref="scrollbarRef" class="scrollbar">
      <div class="flex-row center-y left-x">
        <div
          v-for="(tag, idx) in visitedViews" :key="idx"
          class="tag-item cursor-pointer flex-row center-y"
          :class="{'current': tag.fullPath === route.fullPath}"
          @click="showTagsView(tag)"
        >
          <span>{{ tag.title }}</span>
          <span v-if="!tag.meta?.affix" class="close" @click.stop="closeTagsView(tag)">
            <IconClose />
          </span>
        </div>
      </div>
    </ElScrollbar>
    <div class="operation flex-row center-y">
      <ElIcon class="cursor-pointer refresh" @click="handleRefresh">
        <IconReload />
      </ElIcon>
      <ElDropdown trigger="click" @command="handleTags">
        <ElIcon class="cursor-pointer">
          <IconOperation />
        </ElIcon>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem command="close" :disabled="currentTag?.meta?.affix">
              <ElIcon><IconClose /></ElIcon>
              关闭标签
            </ElDropdownItem>
            <ElDropdownItem command="closeLeft" divided :disabled="isFirstView()">
              <ElIcon><IconLeft /></ElIcon>
              关闭左侧
            </ElDropdownItem>
            <ElDropdownItem command="closeRight" :disabled="isLastView()">
              <ElIcon><IconRight /></ElIcon>
              关闭右侧
            </ElDropdownItem>
            <ElDropdownItem command="closeOther" divided>
              <ElIcon><IconMiddle /></ElIcon>
              关闭其它
            </ElDropdownItem>
            <ElDropdownItem command="closeAll">
              <ElIcon><IconReduce /></ElIcon>
              关闭所有
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tags-container {
  width: 100%;
  padding: 0 10px;
  height: 33px;
  overflow: hidden;
  .scrollbar {
    flex: 1;
  }
  .tag-item {
    position: relative;
    flex-shrink: 0;
    height: 33px;
    padding: 0 12px;
    line-height: 32px;
    margin-left: 3px;
    font-size: 12px;
    background-color: #FFF;
    border: 1px solid var(--el-border-color-light);
    border-bottom: 0;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    &:first-child {
      margin-left: 0;
    }
    .close {
      margin-left: 4px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      display: inline-block;
      line-height: 15px;
      text-align: center;
      &:hover {
        color: #FFF;
        background: rgb(0 0 0 / 22%);
      }
      svg {
        width: 12px;
        height: 15px;
      }
    }
    &:hover {
      color: var(--el-color-primary);
    }
    &.current {
      color: #fff;
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);
    }
  }
  .operation {
    padding-left: 10px;
    color: var(--el-text-color-regular);
    .refresh {
      margin-right: 13px;
    }
    .el-dropdown {
      color: inherit;
    }
  }
}
</style>