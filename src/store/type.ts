import { UserInfo, UserMenus } from "@/service/type";

export interface RootState {
  account?: string;
}
export interface LoginState {
  token: string;
  userInfo: UserInfo;
  userMenus: UserMenus[];
}
export interface RootWithModuleType {
  login: LoginState;
}
// store的实际类型  进行交叉
export type StoreType = RootState & RootWithModuleType;
