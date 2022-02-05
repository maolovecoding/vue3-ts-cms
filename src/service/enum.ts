export enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 需要拼接上 id
  UserMenus = "/role/" // role/:id/menu
}
