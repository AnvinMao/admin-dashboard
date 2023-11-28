<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import type { User, UserQuery } from '@/types/user';
import { ElMessageBox, type FormInstance } from 'element-plus';
import { labelPosition } from '@/utils';
import Pagination from '@/components/Pagination/index.vue';

defineOptions({
  name: "UserList",
  inheritAttrs: false,
});

const loading = ref<boolean>(true);
const total = ref<number>(1000);
const queryForm = ref<FormInstance>();
const dataList = ref<User[]>();
const editRow = ref<User>();
const query = reactive<UserQuery>({
  page: 1,
  pageSize: 15
});
const dialog = reactive<DialogOption>({
  title: '编辑用户',
  visible: false
})

const statusOptions: OptionType[] = [
  { label: '正常', value: 1 },
  { label: '封禁', value: 0 }
];

const fetchData = () => {
  loading.value = true;
  const list: User[] = [];
  [...new Array(query.pageSize)].map((_, i) => {
    list.push({
      id: i + 1,
      name: `account-${i}`,
      nickname: `用户昵称`,
      status: i % 3 === 0 ? 0 : 1,
      email: `user_${i}@zhomi.com`,
      phone: `1889988009${i}`,
      createTime: '2023-11-26 15:21:09',
    });
  });

  dataList.value = list;
  loading.value = false;
}

const handleEdit = (row: User) => {
  console.log(row);
  editRow.value = Object.assign({}, row);
  dialog.visible = true;
};

const handleDelete = (index: number, row: User) => {
  console.log(row);
  ElMessageBox.confirm('确认要删除吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // request to delete.
    dataList.value?.splice(index, 1);
  }).catch(_ => {});
};

const statusName = (status: number): string => {
  const st = statusOptions.find(x => x.value === status);
  return st?.label || '未知';
}

onMounted(() => setTimeout(() => fetchData(), 1000));
</script>

<template>
  <div class="content">
    <section class="query-form">
      <ElForm ref="queryForm" :model="query" label-width="80px">
        <ElRow :gutter="15">
          <ElCol :xs="24" :sm="12" :lg="8" :xl="6">
            <ElFormItem prop="name" label="用户名">
              <ElInput v-model="query.name" placeholder="用户名" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol :xs="24" :sm="12" :lg="8" :xl="6">
            <ElFormItem prop="status" label="账号状态">
              <ElSelect v-model="query.status">
                <ElOption
                  v-for="item in statusOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </ElSelect>
            </ElFormItem>
          </ElCol>
          <ElCol :xs="24" :sm="12" :lg="8" :xl="6">
            <ElFormItem prop="createTime" label="注册时间">
              <ElDatePicker
                v-model="query.createTime"
                type="datetimerange"
                start-placeholder="注册时间"
                end-placeholder="结束时间"
                range-separator="-"
                format="YYYY-MM-DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
              />
            </ElFormItem>
          </ElCol>
          <ElCol :xs="24" :sm="12" :lg="8" :xl="6">
            <ElFormItem>
              <ElButton type="primary" @click="() => {
                query.page = 1;
                fetchData();
              }">
                <template #icon><IconSearch /></template>
                搜索
              </ElButton>
              <ElButton @click="() => {
                queryForm?.resetFields();
                query.page = 1;
                fetchData();
              }">
                <template #icon><IconReset /></template>
                重置
              </ElButton>
            </ElFormItem>
          </ElCol>
        </ElRow>
      </ElForm>
    </section>
    <section class="mt">
      <ElTable
        v-loading="loading"
        :data="dataList"
        element-loading-text="loading..."
        border
      >
        <ElTableColumn label="ID" prop="id" min-width="70" />
        <ElTableColumn label="账户名" min-width="100" prop="name" />
        <ElTableColumn label="用户昵称" min-width="180">
          <template #default="scope">
            <div class="flex-row center-y left-x icon-cell">
              <IconUser />
              <span>{{ scope.row.nickname }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn label="账号状态" align="center" min-width="100">
          <template #default="scope">
            <el-tag :type="(scope.row.status === 0 ? 'danger': 'success')">
              {{ statusName(scope.row.status) }}
            </el-tag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="注册时间" min-width="190">
          <template #default="scope">
            <div class="flex-row left-x center-y icon-cell">
              <IconTime />
              <span>{{ scope.row.createTime }}</span>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn fixed="right" label="操作" width="150" align="center">
          <template #header>
            <ElButton type="success">
              <template #icon><IconAdd /></template>新增
            </ElButton>
          </template>
          <template #default="scope">
            <ElButton type="primary" link @click="handleEdit(scope.row)">
              <template #icon><IconEdit /></template>
              编辑
            </ElButton>
            <ElButton type="danger" link @click="handleDelete(scope.$index, scope.row)">
              <template #icon><IconDelete /></template>
              删除
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <Pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="query.page"
        v-model:limit="query.pageSize"
        layout="total, prev, pager, next"
        @pagination="fetchData"
      />
    </section>
    <ElDialog
      v-model="dialog.visible"
      :title="dialog.title"
      :close-on-click-modal="false"
    >
      <ElForm :model="editRow" :label-position="labelPosition()" label-width="90px">
        <ElFormItem label="用户昵称" prop="nickname">
          <ElInput v-model="editRow!.nickname" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" :loading="loading">确认</ElButton>
        </ElFormItem>
      </ElForm>
    </ElDialog>
  </div>
</template>