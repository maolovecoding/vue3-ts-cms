import { BreadcrumbType } from "@/base";
import { RouteRecordRaw } from "vue-router";
import { UserMenus } from "./../service/type";
/**
 * 将用户菜单映射为 路由
 * @param userMenus 菜单
 * @returns
 */
export function mapMenusToRoutes(userMenus: UserMenus[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 先去加载所有定义在页面中的路由
  const allRoutes: RouteRecordRaw[] = [];
  // 加载所有定义好的路由文件夹 并且拿到所有符合要求的文件
  const routeFiles = require.context("../router/main", true, /\.ts$/); // 递归的匹配指定文件夹下以ts结尾的文件
  // 拿到所有文件路径
  const filePath = routeFiles.keys();
  filePath.forEach((val) => {
    // 加载具体的文件
    const route = require("@/router/main" + val.split(".")[1]); // 不包含ts 不带后缀名了
    allRoutes.push(route.default);
  });
  // 根据菜单获取需要动态添加的路由
  getRoute(userMenus);
  function getRoute(menus: UserMenus[]) {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((value) => value.path === menu.url);
        if (route) routes.push(route);
      } else getRoute(menu.children as any[]);
    }
  }
  return routes;
}
export function pathMapToMenu(
  userMenus: UserMenus[],
  currentPath: string,
  breadcrumbs?: BreadcrumbType[]
): UserMenus {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu((menu.children as any) ?? [], currentPath);
      if (findMenu) {
        if (findMenu) {
          // 一级菜单没有对应的路由的 不需要path
          breadcrumbs?.push({ name: menu.name });
          breadcrumbs?.push({ name: findMenu.name, path: findMenu.url });
          return findMenu;
        }
      }
    } else if (menu.type === 2 && menu.url === currentPath) return menu;
  }
  return null as any;
}
/**
 * 根据路径获取对应的面包屑展示数据
 * @param userMenus
 * @param currentPath
 * @returns
 */
export function pathMapBreadcrumbs(
  userMenus: UserMenus[],
  currentPath: string
): BreadcrumbType[] {
  const breadcrumbs: BreadcrumbType[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}
