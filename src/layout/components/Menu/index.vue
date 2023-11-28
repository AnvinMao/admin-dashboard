<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useRouteStore } from '@/stores/route';

import Logo from './Logo.vue';
import Item from './Item.vue';

defineProps<{ collapse: boolean }>();
const route = useRoute();
const routeStore = useRouteStore();
</script>

<template>
  <div class="menu">
    <Logo :collapse="collapse" />
    <ElScrollbar>
      <ElMenu
        :default-active="route.path"
        :unique-opened="false"
        :router="true"
        :collapse="collapse"
        :collapse-transition="false"
        mode="vertical"
      >
        <template v-for="(route, idx) in routeStore.routes">
          <Item
            v-if="!route.meta || !route.meta.hidden"
            :key="idx"
            :item="route"
          />
        </template>
      </ElMenu>
    </ElScrollbar>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  height: 100%;
  background-color: var(--el-menu-bg-color);
  transition: all .2s ease;
  width: var(--sidebar-width);
  box-shadow: 0 0 2rem 0 rgba(0,0,0,.05);
  .el-menu {
    width: 100% !important;
    height: 100%;
    border: none;
  }
  .el-scrollbar {
    height: calc(100% - 83px);
  }
}
</style>