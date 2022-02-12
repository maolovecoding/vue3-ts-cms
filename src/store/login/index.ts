import { mapMenusToRoutes, mapMenuToPermissions } from "@/utils";
import { UserMenus } from "./../../service/type";
import type { Module } from "vuex";
import type { RootState, LoginState } from "../type";
import type { Account } from "@/types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login";
import { UserInfo } from "@/service/type";
import { localCache } from "@/utils";
import router from "@/router";
const loginModule: Module<LoginState, RootState> = {
  namespaced: true,
  state: {
    userInfo: {} as UserInfo,
    token: "",
    userMenus: [] as UserMenus[],
    permission: []
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: UserMenus[]) {
      state.userMenus = userMenus;
      // 动态注册路由 根据菜单生成
      const routes = mapMenusToRoutes(userMenus);
      routes.forEach((route) => router.addRoute("main", route));
      // 获取菜单权限
      state.permission = mapMenuToPermissions(userMenus);
    }
  },
  actions: {
    /**
     * 登录
     * @param commit
     * @param account
     */
    async accountLoginAction({ commit }, account: Account) {
      const { data: res } = await accountLoginRequest(account);
      console.log(res);
      const { id, token } = res;
      // 保存token
      commit("changeToken", token);
      localCache.setCache("token", token);
      // 获取 userInfo
      const { data: userInfo } = await requestUserInfoById(id);
      console.log(userInfo);
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);
      // 获取 userMenus
      const { data: userMenus } = await requestUserMenusByRoleId(
        userInfo.role.id
      );
      console.log(userMenus);
      commit("changeUserMenus", userMenus);
      localCache.setCache("userMenus", userMenus);
      // 跳转首页
      router.push("/main");
    },
    /**
     * 刷新页面时 加载缓存数据到vuex中
     * @param param0
     */
    loadLocalLogin({ commit }) {
      const token = localCache.getCache<string>("token");
      token && commit("changeToken", token);
      const userInfo = localCache.getCache<UserInfo>("userInfo");
      userInfo && commit("changeUserInfo", userInfo);
      const userMenus = localCache.getCache<UserMenus[]>("userMenus");
      userMenus && commit("changeUserMenus", userMenus);
    },
    phoneLoginAction({ commit }, payload: any) {
      console.log(payload);
    }
  }
};

export default loginModule;
