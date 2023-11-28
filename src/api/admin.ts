import { http } from '@/utils/request';
import type { Admin, LoginData } from '@/types/admin';

export function adminLogin(data: LoginData) {
  return http.post<{ token: string }>('/login', data);
}

export function getAccount() {
  return http.get<Admin>('/account');
}

export function adminLogout() {
  return http.post('/logout');
}