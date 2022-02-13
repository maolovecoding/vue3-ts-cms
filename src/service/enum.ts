export enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 需要拼接上 id
  UserMenus = "/role/" // role/:id/menu
}
export enum DashboardAPI {
  // 数量
  categoryGoodsCount = "/goods/category/count",
  // 销量
  categoryGoodsSale = "/goods/category/sale",
  // 收藏
  categoryGoodsFavor = "/goods/category/favor",
  // 城市销量
  addressGoodsSale = "/goods/address/sale"
}
