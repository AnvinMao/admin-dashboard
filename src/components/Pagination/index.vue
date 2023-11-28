<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = withDefaults(defineProps<{
  total: number;
  page: number;
  limit?: number;
  pageSizes?: number[];
  layout?: string;
  background?: boolean;
  hidden?: boolean;
}>(), {
  total: 0,
  page: 1,
  limit: 20,
  pageSizes: () => [10, 20, 30, 40, 50],
  layout: "total, sizes, prev, pager, next, jumper",
  background: true,
  hidden: false
});

const emit = defineEmits(["pagination", "update:page", "update:limit"]);

const currentPage = useVModel(props, "page", emit);

const pageSize = useVModel(props, "limit", emit);

function handleSizeChange(val: number) {
  emit("pagination", { page: currentPage, limit: val });
}

function handleCurrentChange(val: number) {
  currentPage.value = val;
  emit("pagination", { page: val, limit: props.limit });
}
</script>

<template>
  <div :class="{ hidden: hidden }" class="pagination">
    <ElPagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  padding-top: 15px;

  &.hidden {
    display: none;
  }
}
</style>
