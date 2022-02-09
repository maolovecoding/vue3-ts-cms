import { UserInfo, UserMenus, User, RoleType } from "@/service/type";

export interface RootState {
  account?: string;
}
export interface LoginState {
  token: string;
  userInfo: UserInfo;
  userMenus: UserMenus[];
}
export interface SystemState {
  userList: User[];
  userCount: number;
  roleList: RoleType[];
  roleCount: number;
}
export interface RootWithModuleType {
  login: LoginState;
  system: SystemState;
}
// store的实际类型  进行交叉
export type StoreType = RootState & RootWithModuleType;
