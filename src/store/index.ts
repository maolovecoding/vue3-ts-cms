import { getPageListData } from "@/service/main/system/system";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { RootState, StoreType } from "./type";
import login from "./login";
import { system, dashboard } from "./main";
const store = createStore<RootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenu: []
  },
  mutations: {
    changeEntireDepartment(state, entireDepartment: any[]) {
      state.entireDepartment = entireDepartment;
    },
    changeEntireRole(state, entireRole: any[]) {
      state.entireRole = entireRole;
    },
    changeEntireMenu(state, entireMenu: any[]) {
      state.entireMenu = entireMenu;
    }
  },
  actions: {
    /**
     * 获取角色和部门数据 在新建 编辑等中的选择框中显示
     * @param param0
     */
    async getInitialDataAction({ commit }) {
      // 请求部门和角色数据
      const { data: departmentResult } = await getPageListData(
        "/department/list",
        {
          offset: 0,
          size: 1000
        }
      );
      const { data: roleResult } = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      // 请求权限菜单数据
      const { data: menuResult } = await getPageListData("/menu/list");
      commit("changeEntireDepartment", departmentResult.list);
      commit("changeEntireRole", roleResult.list);
      commit("changeEntireMenu", menuResult.list);
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
});
/**
 * 刷新页面时 从缓存加载数据
 */
export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  // store.dispatch("getInitialDataAction");
}

export function useStore(): Store<StoreType> {
  return vuexUseStore<StoreType>();
}
export default store;
