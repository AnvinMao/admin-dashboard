import router from "@/router";
import LocalStore from '@/utils/storage';

import { useAdminStore } from "./stores/admin";
import { useRouteStore } from "./stores/route";

import nProgress from "nprogress";
import 'nprogress/nprogress.css';
nProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  nProgress.start();
  const token = LocalStore.getAuthToken();
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
      nProgress.done();
    } else {
      const store = useAdminStore();
      if (store.account) {
        if (to.matched.length === 0) {
          from.name ? next({ name: from.name }) : next('/404');
        } else {
          next();
        }
      } else {
        try {
          const account = await store.accountInfo();
          const routeStore = useRouteStore();
          const accessRoutes = await routeStore.generateRoutes(
            account.role || 'none'
          );
          accessRoutes.forEach(route => {
            router.addRoute(route);
          });
          next({ ...to, replace: true });
        } catch(err) {
          store.resetToken();
          next(`/login?redirect=${to.path}`);
          nProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      nProgress.done();
    }
  }
});

router.afterEach(() => nProgress.done());