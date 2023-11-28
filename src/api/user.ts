import { http } from '@/utils/request';
import type { User, UserQuery } from '@/types/user';

export function userList(params: UserQuery) {
  return http.get<PageResult<User[]>>('/user/list', { params: params });
}
