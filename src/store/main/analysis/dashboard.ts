import type { Module } from "vuex";
import type { DashboardState, RootState } from "@/store/type";
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/service/main/analysis/dashboard";
const dashboard: Module<DashboardState, RootState> = {
  namespaced: true,
  state: {
    // 数量
    categoryGoodsCount: [],
    // 销量
    categoryGoodsSale: [],
    // 收藏
    categoryGoodsFavor: [],
    // 城市销量
    addressGoodsSale: []
  },
  mutations: {
    changeCategoryGoodsCount(state, categoryGoodsCount: any[]) {
      state.categoryGoodsCount = categoryGoodsCount;
    },
    changeCategoryGoodsSale(state, categoryGoodsSale: any[]) {
      state.categoryGoodsSale = categoryGoodsSale;
    },
    changeCategoryGoodsFavor(state, categoryGoodsFavor: any[]) {
      state.categoryGoodsFavor = categoryGoodsFavor;
    },
    changeAddressGoodsSale(state, addressGoodsSale: any[]) {
      state.addressGoodsSale = addressGoodsSale;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountRes = await getCategoryGoodsCount();
      commit("changeCategoryGoodsCount", categoryCountRes.data);
      const categorySaleRes = await getCategoryGoodsSale();
      commit("changeCategoryGoodsSale", categorySaleRes.data);
      const categoryFavorRes = await getCategoryGoodsFavor();
      commit("changeCategoryGoodsFavor", categoryFavorRes.data);
      const addressGoodsRes = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", addressGoodsRes.data);
    }
  }
};
export default dashboard;
