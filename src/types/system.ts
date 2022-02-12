export interface QueryInfo {
  offset?: number;
  size?: number;
  name?: string;
  cellphone?: string;
}

export interface PageQueryInfo {
  pageName: string;
  queryInfo?: QueryInfo;
  // 新建 编辑
  pageData?: any;
  // 编辑时使用
  id?: any;
}
