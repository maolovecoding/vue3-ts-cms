import { UserInfo, UserMenus, User, RoleType, GoodsType } from "@/service/type";

export interface RootState {
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
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

export interface DashboardState {
  categoryGoodsCount: any[];
  categoryGoodsSale: any[];
  categoryGoodsFavor: any[];
  addressGoodsSale: any[];
}

export interface RootWithModuleType {
  login: LoginState;
  system: SystemState;
  dashboard: DashboardState;
}
// store的实际类型  进行交叉
export type StoreType = RootState & RootWithModuleType;
