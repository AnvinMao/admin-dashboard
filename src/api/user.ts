import { http } from '@/utils/request';

export interface User {
  id: number;
  name: string;
  nickname?: string;
  status: number;
  email?: string;
  phone?: string;
  createTime: string;
}

export interface UserQuery extends PageQuery {
  name?: string;
  createTime?: string[];
  status?: number
}

export function userList(params: UserQuery) {
  return http.get<PageResult<User[]>>('/user/list', { params: params });
}
