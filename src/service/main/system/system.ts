import request from "../../index";
import { QueryInfo } from "../../../types";
export function getPageListData<T>(url: string, queryInfo: QueryInfo) {
  return request.post<T>({
    url,
    data: queryInfo
  });
}
