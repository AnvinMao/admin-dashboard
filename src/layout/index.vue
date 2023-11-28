<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { useWindowSize } from '@vueuse/core';
import { watchEffect } from 'vue';
import { AppMain, Menu, Navbar, Tags } from './components';

const WIDTH = 992;
const { width } = useWindowSize();

const appStore = useAppStore();

watchEffect(() => {
  if (width.value < WIDTH) {
    appStore.toggleDevice('mobile');
    appStore.closeSidebar();
  } else {
    appStore.toggleDevice('desktop');
    if (width.value >= 1200) {
      appStore.openSidebar();
    } else {
      appStore.closeSidebar();
    }
  }
});
</script>

<template>
  <div :class="{'collapse': appStore.collapse, 'mobile': appStore.device === 'mobile'}">
    <div
      v-if="appStore.device === 'mobile' && !appStore.collapse"
      class="mask"
      @click="() => {
        appStore.closeSidebar();
      }"
    ></div>
    <Menu :collapse="appStore.collapse && appStore.device !== 'mobile'" />
    <div class="container">
      <div class="header">
        <Navbar />
        <Tags />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$menuWidth: 210px;
$collapseWidth: 58px;
.menu {
  width: $menuWidth;
}
.container {
  position: relative;
  min-height: 100%;
  margin-left: $menuWidth;
  transition: margin-left .28s;
  box-sizing: border-box;
  .header {
    width: calc(100% - $menuWidth);
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    background-image: radial-gradient(transparent 1px, #fff 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
    border-bottom: 1px solid var(--border-color);
    box-shadow: 0 1px 10px rgb(15 51 122 / 12%);
    transition: width 0.2s ease;
  }
}
.collapse {
  &:not(.mobile) .menu {
    width: $collapseWidth;
  }
  .container {
    margin-left: $collapseWidth;
    .header {
      width: calc(100% - $collapseWidth);
    }
  }
}
.mobile {
  .container {
    margin-left: 0;
    .header {
      width: 100%;
    }
  }
  &.collapse {
    .menu {
      transform: translateX(-$menuWidth);
    }
  }
  &:not(.collapse) {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    overflow: hidden;
  }
}
.mask {
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
}
</style>