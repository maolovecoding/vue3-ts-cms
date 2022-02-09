export interface QueryInfo {
  offset?: number;
  size?: number;
}

export interface PageQueryInfo {
  pageName: string;
  queryInfo: QueryInfo;
}
