import { RoleType } from "@/service/type";
import { RootState, SystemState } from "./../../type";
import { Module } from "vuex";
import { getPageListData } from "../../../service/main/system/system";
import { PageQueryInfo } from "../../../types";
import { DataType, User } from "../../../service/type";
const system: Module<SystemState, RootState> = {
  namespaced: true,
  state: {
    userCount: 0,
    userList: [] as User[],
    roleList: [] as RoleType[],
    roleCount: 0
  },
  mutations: {
    changeUserList(state, userList: User[]) {
      state.userList = userList;
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    changeRoleList(state, roleList: RoleType[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    }
  },
  getters: {
    pageListData(state) {
      // 参数是 页面名称 且拼接上 List 用来获取页面需要展示的数据
      return (pageNamePadList: keyof SystemState) => state[pageNamePadList];
    }
  },
  actions: {
    // 获取整个页面的数据
    async getPageInfoAction({ commit }, payload: PageQueryInfo) {
      // 为了通用 迫不得已使用any
      const { data: res } = await getPageListData<DataType<any>>(
        // 根据页面名称 拼接出需要请求数据的 url地址
        `/${
          payload.pageName === "user"
            ? payload.pageName + "s"
            : payload.pageName
        }/list`,
        payload.queryInfo
      );
      const { list, totalCount } = res;
      const commitName =
        payload.pageName.charAt(0).toUpperCase() +
        payload.pageName.substring(1);
      commit(`change${commitName}List`, list);
      commit(`change${commitName}Count`, totalCount);
    }
  }
};

export { system };
