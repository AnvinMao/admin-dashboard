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