/**
 * 数据类型
 */
export interface DataType<T = any> {
  data: T;
  code: number;
}
export interface LoginResult {
  id: number;
  name: string;
  token: string;
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
}

export interface Department {
  id: number;
  name: string;
  parentId?: any;
  createAt: Date;
  updateAt: Date;
  leader: string;
}

export interface UserInfo {
  id: number;
  name: string;
  realname: string;
  cellphone: number;
  enable: number;
  createAt?: Date;
  updateAt?: Date;
  role: Role;
  department: Department;
}

export interface UserMenusChildChild {
  id: number;
  url?: any;
  name: string;
  sort?: any;
  type: number;
  parentId: number;
  permission: string;
}

export interface UserMenusChild {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children: UserMenusChildChild[];
  parentId: number;
}

export interface UserMenus {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: UserMenusChild[];
}

export interface User {
  id: number;
  name: string;
  realname: string;
  cellphone: any;
  enable: number;
  departmentId: number;
  roleId: number;
  createAt: Date;
  updateAt: Date;
}

export interface UserListType {
  list: User[];
  totalCount: number;
}

// role
export interface RoleChild2 {
  id: number;
  url?: any;
  name: string;
  sort?: any;
  type: number;
  parentId: number;
  permission: string;
}

export interface RoleChild1 {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children: RoleChild2[];
  parentId: number;
}

export interface RoleMenuList {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  children: RoleChild1[];
}

export interface RoleType {
  id: number;
  name: string;
  intro: string;
  createAt: Date;
  updateAt: Date;
  menuList: RoleMenuList[];
}

export interface RoleListType {
  list: RoleType[];
  totalCount: number;
}

// goods
export interface GoodsType {
  id: number;
  name: string;
  oldPrice: string;
  newPrice: string;
  desc: string;
  status: number;
  imgUrl: string;
  inventoryCount: number;
  saleCount: number;
  favorCount: number;
  address: string;
  categoryId: number;
  createAt: Date;
  updateAt: Date;
}

export interface GoodsListType {
  list: GoodsListType[];
  totalCount: number;
}
