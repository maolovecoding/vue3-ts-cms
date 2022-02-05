import type { Account } from "@/types";
import { LoginAPI } from "./enum";
import request from "./index";
import { DataType, LoginResult, UserInfo, UserMenus } from "@/service/type";
/**
 * 登录请求
 * @param account 账号
 */
export function accountLoginRequest(account: Account) {
  return request.post<DataType<LoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return request.get<DataType<UserInfo>>({
    url: LoginAPI.LoginUserInfo + id
  });
}

export function requestUserMenusByRoleId(id: number) {
  return request.get<DataType<UserMenus[]>>({
    url: LoginAPI.UserMenus + id + "/menu"
  });
}
