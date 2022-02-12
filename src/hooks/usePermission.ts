import { useStore } from "@/store";
/**
 * 检查当前用户是否具有某页面的权限 页面展示的数据的 增 删 改 权限
 * @param pageName 页面
 * @param handleName 校验的权限
 */
export function usePermission(pageName: string, handleName: string) {
  const store = useStore();
  const permission = store.state.login.permission;
  // 校验的权限
  const verifyPermission = `system:${
    pageName === "user" ? pageName + "s" : pageName
  }:${handleName}`;
  return !!permission.find((item) => item === verifyPermission);
}
