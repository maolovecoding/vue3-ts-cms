import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { RootState, StoreType } from "./type";
import login from "./login";
import { system } from "./main";
const store = createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login,
    system
  }
});
/**
 * 刷新页面时 从缓存加载数据
 */
export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}

export function useStore(): Store<StoreType> {
  return vuexUseStore<StoreType>();
}
export default store;
