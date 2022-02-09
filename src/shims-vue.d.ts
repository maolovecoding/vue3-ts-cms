/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  // vue文件导出的组件实例
  export default component;
}
// 过滤器
declare const $filters: { formatTime: (time: string) => string };
