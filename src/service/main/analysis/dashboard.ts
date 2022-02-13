import request from "@/service";
import { DashboardAPI } from "@/service/enum";
export function getCategoryGoodsCount() {
  return request.get({
    url: DashboardAPI.categoryGoodsCount
  });
}
export function getCategoryGoodsSale() {
  return request.get({
    url: DashboardAPI.categoryGoodsSale
  });
}
export function getCategoryGoodsFavor() {
  return request.get({
    url: DashboardAPI.categoryGoodsFavor
  });
}
export function getAddressGoodsSale() {
  return request.get({
    url: DashboardAPI.addressGoodsSale
  });
}
