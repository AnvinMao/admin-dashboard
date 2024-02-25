<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { LoginData } from '@/api/admin';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useAdminStore } from '@/stores/admin';
import { useRoute, useRouter, type LocationQuery, type LocationQueryValue } from 'vue-router';

const loading = ref<boolean>(false);
const passwordVisiable = ref<boolean>(false);
const remember = ref<boolean>(true);
const loginFormRef = ref<FormInstance>();
const adminStore = useAdminStore();
const route = useRoute();
const router = useRouter();
const params = reactive<LoginData>({
  account: '',
  password: ''
});

const passwordValidator = (rule: any, value: string, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'));
  } else {
    callback();
  }
}

const rules = ref<FormRules<LoginData>>({
  account: [{ required: true, trigger: "blur", message: '请输入登录账号' }],
  password: [{ required: true, trigger: "blur", validator: passwordValidator }],
});

const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (!valid) {
      return;
    }

    loading.value = true;
    adminStore.login(params).then(() => {
      const query: LocationQuery = route.query;
      const redirect = (query.redirect as LocationQueryValue) ?? '/';
      const otherParams = Object.keys(query).reduce((acc: any, cur: string) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});

      router.push({ path: redirect, query: otherParams });
    }).catch((err) => {
      console.error(err);
      ElMessage.error("登录失败，账号或密码错误！");
    }).finally(() => loading.value = false);
  });
}
</script>

<template>
  <div class="container">
    <div class="login-form flex-row center-y">
      <div class="image">
        <img src="@/assets/images/dreamer.svg" />
      </div>
      <ElForm ref="loginFormRef" :model="params" :rules="rules" class="form">
        <ElFormItem prop="account">
          <span class="icon"><IconUser /></span>
          <ElInput
            v-model="params.account"
            size="large"
            maxlength="16"
            placeholder="账号名称"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <span class="icon"><IconLock /></span>
          <ElInput
            v-model="params.password"
            size="large"
            placeholder="登录密码"
            maxlength="28"
            :type="passwordVisiable ? 'input' : 'password'"
          />
          <span
            @click="passwordVisiable = !passwordVisiable"
            class="cursor-pointer icon"
          >
            <component :is="passwordVisiable ? `IconHide` : `IconShow`" />
          </span>
        </ElFormItem>
        <div class="flex-row center-y">
          <el-checkbox v-model="remember" label="记住登录账号" />
          <el-popover
            placement="top-end"
            title="提示信息"
            :width="200"
            trigger="click"
            content="请联系技术人员！"
          >
            <template #reference>
              <a href="#" class="forgot">忘记密码?</a>
            </template>
          </el-popover>
        </div>
        <el-button
          :loading="loading"
          type="primary"
          class="login-btn"
          @click.prevent="handleLogin"
        >
          登录
        </el-button>
      </ElForm>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$grey: #999;

.container {
  height: 100vh;
  width: 100%;
  background: #1A2038;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-form {
  background: white;
  border-radius: 10px;
  width: 768px;
  max-width: 90%;
  padding: 50px 0;
  box-shadow: rgb(0 0 0 / 6%) 0 3px 3px -2px,
    rgb(0 0 0 / 4%) 0 3px 4px 0, rgb(0 0 0 / 4%) 0 1px 8px 0;
  .image {
    width: 50%;
    padding: 0 24px;
    img {
      width: 100%;
    }
  }
  .form {
    flex: 1;
    padding: 0 24px;
    .icon {
      padding: 0 10px;
      color: $grey;
      line-height: 1;
      svg {
        width: 18px;
        height: 18px;
      }
    }
    .forgot {
      font-size: 14px;
      color: $grey;
    }
    .login-btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
.el-form-item {
  background: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
}

.el-input {
  background: transparent;
  flex: 1 1 0%;

  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;
    &.is-focus, &:hover {
      box-shadow: none!important;
    }

    .el-input__inner {
      color: #666;
      caret-color: #666;
      background: transparent;
      border: 0;
      border-radius: 0;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #666 !important;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition: color 99999s ease-out, background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
@media(max-width: 620px) {
  .login-form {
    flex-direction: column;
    width: 420px;
    .image, .form {
      width: 100%;
    }
    .image {
      padding-bottom: 40px;
    }
  }
}
</style>