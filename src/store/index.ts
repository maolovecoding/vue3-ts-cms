import { createStore, Store, useStore as vuexUseStore } from "vuex";
import type { RootState, StoreType } from "./type";
import login from "./login";
const store = createStore<RootState>({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    login
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
