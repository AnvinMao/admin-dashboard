import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue';

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '后台首页', icon: 'IconBoard', affix: true },
      },
      {
        path: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { hidden: true }
      }
    ]
  },
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  }
];

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '用户管理', icon: 'IconMember' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index.vue'),
        name: 'UserList',
        meta: { title: '用户列表', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/index',
    meta: { title: '文章管理', icon: 'IconArticle' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/article/index.vue'),
        name: 'ArticleList',
        meta: { title: '文章列表', roles: ['admin'] }
      },
      {
        path: 'add',
        component: () => import('@/views/article/add.vue'),
        name: 'AddArticle',
        meta: { title: '发布文章', roles: ['admin'] }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/article/edit.vue'),
        name: 'EditArticle',
        meta: { title: '编辑文章', roles: ['admin'], hidden: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0, left: 0 })
});

export default router
