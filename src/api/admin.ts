import { http } from '@/utils/request';

export interface LoginData {
  account: string;
  password: string;
}

export interface Admin {
  id: number;
  account: string;
  role: string;
}

export function adminLogin(data: LoginData) {
  return http.post<{ token: string }>('/login', data);
}

export function getAccount() {
  return http.get<Admin>('/account');
}

export function adminLogout() {
  return http.post('/logout');
}