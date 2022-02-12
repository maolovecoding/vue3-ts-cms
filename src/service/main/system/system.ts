import request from "../../index";
import { QueryInfo } from "../../../types";
import type { DataType } from "@/service/type";
export function getPageListData<T>(url: string, queryInfo?: QueryInfo) {
  return request.post<T>({
    url,
    data: queryInfo
  });
}
/**
 *
 * @param url  /users/:id
 * @returns
 */
export function deletePageData(url: string) {
  return request.delete<DataType>({
    url
  });
}
/**
 * 添加数据
 * @param url
 * @param data 添加的数据
 * @returns
 */
export function createPageData(url: string, data: any) {
  console.log(data);

  return request.post<DataType>({ url, data });
}

export function editPageData(url: string, data: any) {
  console.log(data);
  return request.patch<DataType>({ url, data });
}
