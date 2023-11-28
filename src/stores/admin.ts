import { ref } from 'vue'
import { defineStore } from 'pinia'
import { adminLogin, adminLogout, getAccount } from '@/api/admin';
import type { Admin, LoginData } from '@/types/admin';
import LocalStore from '@/utils/storage';

export const useAdminStore = defineStore('admin', () => {
  const account = ref<Admin>();

  const login = (data: LoginData) => {
    return new Promise<void>((resolve, reject) => {
      /*
      adminLogin(data).then(res => {
        LocalStore.setAuthToken(res.token);
        resolve();
      }).catch(err => {
        reject(err);
      })*/
      LocalStore.setAuthToken(data.account);
      resolve();
    });
  }

  const accountInfo = () => {
    return new Promise<Admin>((resolve, reject) => {
      /*getAccount().then(res => {
        account.value = res;
        resolve(res)
      }).catch(err => {
        reject(err);
      })*/
      account.value = { id: 1, account: 'admin', role: 'admin' }
      resolve(account.value);
    });
  }

  const logout = () => {
    return new Promise<void>((resolve, reject) => {
      adminLogout().then(() => {
        resetToken();
        location.reload();
        resolve();
      }).catch(err => {
        reject(err);
      })
    })
  }

  const resetToken = () => {
    LocalStore.removeAuthToken();
    account.value = undefined;
  }

  return { account, login, logout, accountInfo, resetToken };
})
