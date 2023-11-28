<script setup lang="ts">
import { useAppStore } from '@/stores/app';
import { ElMessage } from 'element-plus';

const appStore = useAppStore();
const options: OptionType[] = [
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' },
  { label: '小型', value: 'small' }
];

const handleSize = (size: string) => {
  appStore.changeSize(size);
  ElMessage.success('布局大小切换成功');
}
</script>

<template>
  <ElDropdown trigger="click" @command="handleSize">
    <ElIcon><IconLayout /></ElIcon>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem
          v-for="item in options"
          :key="item.value"
          :disabled="appStore.size === item.value"
          :command="item.value"
        >
          {{ item.label }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>