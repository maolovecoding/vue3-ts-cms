import { UserInfo, UserMenus, User, RoleType, GoodsType } from "@/service/type";

export interface RootState {
  entireDepartment: any[];
  entireRole: any[];
}
export interface LoginState {
  token: string;
  userInfo: UserInfo;
  userMenus: UserMenus[];
  // 按钮权限
  permission: string[];
}
export interface SystemState {
  userList: User[];
  userCount: number;
  roleList: RoleType[];
  roleCount: number;
  goodsList: GoodsType[];
  goodsCount: number;
  menuList: any[];
  menuCount: number;
}
export interface RootWithModuleType {
  login: LoginState;
  system: SystemState;
}
// store的实际类型  进行交叉
export type StoreType = RootState & RootWithModuleType;
