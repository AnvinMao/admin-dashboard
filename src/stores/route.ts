import { defineStore } from "pinia";
import { ref } from 'vue';
import { asyncRoutes, constantRoutes } from "@/router";
import type { RouteRecordRaw } from 'vue-router';

/**
 * Use meta.role to determine if the current user has permission
 *
 * @param role 用户角色
 * @param route 路由
 * @returns
 */
const hasPermission = (role: string, route: RouteRecordRaw): boolean => {
  if (route.meta && route.meta.roles) {
    return (route.meta.roles as string[]).includes(role);
  }

  return true;
}

/**
 * 递归过滤有权限的异步(动态)路由
 *
 * @param routes 接口返回的异步(动态)路由
 * @param roles 用户角色集合
 * @returns 返回用户有权限的异步(动态)路由
 */
const filterAsyncRoutes = (routes: RouteRecordRaw[], role: string): RouteRecordRaw[] => {
  const asyncRoutes: RouteRecordRaw[] = [];
  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(role, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, role);
      }
      asyncRoutes.push(tmp);
    }
  });

  return asyncRoutes;
}

export const useRouteStore = defineStore('route', () => {
  const routes = ref<RouteRecordRaw[]>([]);

  const generateRoutes = (role: string): Promise<RouteRecordRaw[]> => {
    return new Promise<RouteRecordRaw[]>((resolve, reject) => {
      let accessedRoutes;
      if (role === 'admin') {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, role);
      }

      routes.value = constantRoutes.concat(accessedRoutes);
      resolve(accessedRoutes);
    })
  }

  return { routes, generateRoutes };
})