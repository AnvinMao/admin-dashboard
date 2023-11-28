<script setup lang="ts">
import Hamburger from './Hamburger.vue';
import Breadcrumb from './Breadcrumb.vue';
import SizeSelect from './SizeSelect.vue';
import { useAppStore } from '@/stores/app';
import { useAdminStore } from '@/stores/admin';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
import { useFullscreen } from '@vueuse/core';

const appStore = useAppStore();
const adminStore = useAdminStore();
const route = useRoute();
const router = useRouter();

const { isFullscreen, toggle } = useFullscreen();

const logout = () => {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    adminStore
      .logout()
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  }).catch(() => {});
}

const resetPassword = () => {
  ElMessage.warning('不能修改密码')
}
</script>

<template>
  <div class="navbar flex-row center-y">
    <Hamburger :active="!appStore.collapse" @toggle="() => {
      appStore.toggleSidebar();
    }" />
    <div class="breadcrumb">
      <Breadcrumb />
    </div>
    <div class="flex-row center-y operation">
      <template v-if="appStore.device !==  'mobile'">
        <ElTooltip content="布局大小" effect="dark" placement="bottom">
          <SizeSelect class="setting-item" />
        </ElTooltip>
        <div class="setting-item">
          <ElIcon @click="toggle">
            <component :is="isFullscreen ? `IconExitFullscreen` : `IconFullscreen`"/>
          </ElIcon>
        </div>
      </template>
      <ElDropdown trigger="click">
        <div class="avatar flex-row center-y">
          <img src="@/assets/images/avatar.jpg" />
          <span>{{ adminStore.account?.account }}</span>
          <IconDown />
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="resetPassword">
              修改密码
            </ElDropdownItem>
            <ElDropdownItem divided @click="logout">
              退出账号
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  .breadcrumb {
    flex: 1;
  }
  .operation {
    flex-shrink: 0;
    padding-right: 10px;
  }
  .avatar {
    overflow: hidden;
    cursor: pointer;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    span {
      padding: 0 5px;
    }
    svg {
      width: 10px;
    }
  }
  .setting-item {
    font-size: 16px;
    cursor: pointer;
    margin-right: 15px;
    line-height: 1;
    color: var(--el-text-color-regular)
  }
}
</style>