import axios, {
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios';
import LocalStore from './storage';
import { ElMessageBox } from 'element-plus';

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 30000,
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

    const token = LocalStore.getAuthToken();
    if (token != null) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: any) => {
    const res = error.response;
    console.log('API Error', res);
    if (res?.status === 401) {
      ElMessageBox.confirm("当前会话已失效，请重新登录", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        LocalStore.removeAuthToken();
        location.reload();
      });
    }

    return Promise.reject(res);
  }
);

export const http = {

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.get(url, config);
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, config);
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config);
  },

  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.delete(url, config);
  }
};

export default service;