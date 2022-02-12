import type { RoleType, DataType, User, GoodsType } from "@/service/type";
import { RootState, SystemState } from "./../../type";
import { Module } from "vuex";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system";
import { PageQueryInfo } from "@/types";
const system: Module<SystemState, RootState> = {
  namespaced: true,
  state: {
    userCount: 0,
    userList: [] as User[],
    roleList: [] as RoleType[],
    roleCount: 0,
    goodsList: [] as GoodsType[],
    goodsCount: 0,
    menuList: [],
    menuCount: 0
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
    },
    changeGoodsList(state, goodsList: GoodsType[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount = 0) {
      state.menuCount = menuCount;
    }
  },
  getters: {
    pageListData(state) {
      // 参数是 页面名称 且拼接上 List 用来获取页面需要展示的数据
      return (pageNamePadList: keyof SystemState) => state[pageNamePadList];
    },
    pageListDataTotalCount(state) {
      return (pageNamePadCount: keyof SystemState) => state[pageNamePadCount];
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
    },
    /**
     * 删除数据
     * @param param0
     * @param payload
     */
    async deletePageDataAction(
      { dispatch },
      payload: { pageName: string; id: number }
    ) {
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await deletePageData(pageUrl);
      // 刷新页面数据
      dispatch("getPageInfoAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      });
    },
    /**
     * 添加数据
     * @param param0
     * @param payload
     */
    async createPageDataAction({ dispatch }, payload: PageQueryInfo) {
      const pageName = payload.pageName;
      await createPageData(
        `/${pageName === "user" ? pageName + "s" : pageName}`,
        payload.pageData
      );
      // 刷新页面数据
      dispatch("getPageInfoAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      });
    },
    async editPageDataAction({ dispatch }, payload: PageQueryInfo) {
      const { pageName, pageData: editData, id } = payload;
      await editPageData(
        `/${pageName === "user" ? pageName + "s" : pageName}/${id}`,
        editData
      );
      // 刷新页面数据
      dispatch("getPageInfoAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 5
        }
      });
    }
  }
};

export { system };
