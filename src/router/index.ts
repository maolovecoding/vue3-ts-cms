import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
// import Login from "views/login/Login.vue";
import { localCache } from "@/utils";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "chunk-login" */ "views/login/Login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "chunk-main" */ "views/main/Main.vue")
    // children [] 动态注册 根据 userMenus动态生成
  },
  // 匹配未找到的路径
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /* webpackChunkName: "chunk-not-found" */ "views/not-found/NotFound.vue"
      )
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = localCache.getCache<string>("token");
    if (!token) return "/login";
  }
});
export default router;
