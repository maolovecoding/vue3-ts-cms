export interface BreadcrumbType {
  name: string;
  // 有些是没有path的，因为没有对应的完整路由
  path?: string;
}
