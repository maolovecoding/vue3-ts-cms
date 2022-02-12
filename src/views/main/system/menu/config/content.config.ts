const propListConfig = [
  { prop: "name", label: "菜单名称", minWidth: "120", slotName: "name" },
  {
    prop: "type",
    label: "菜单类型",
    minWidth: "60",
    slotName: "type"
  },
  {
    prop: "url",
    label: "菜单路由",
    minWidth: "100",
    slotName: "url"
  },
  {
    prop: "icon",
    label: "菜单图标",
    minWidth: "100",
    slotName: "icon"
  },
  {
    prop: "permission",
    label: "按钮权限",
    minWidth: "100",
    slotName: "permission"
  },
  // { prop: "sort", label: "状态", minWidth: "100", slotName: "sort" },
  {
    prop: "createAt",
    label: "创建时间",
    minWidth: "180",
    slotName: "createAt"
  },
  {
    prop: "updateAt",
    label: "更新时间",
    minWidth: "180",
    slotName: "updateAt"
  },
  {
    label: "操作",
    minWidth: "180px",
    slotName: "operation"
  }
];
const showIndexColumn = false;
const showSelectColumn = false;
const title = "菜单列表";
export default {
  title,
  showIndexColumn,
  showSelectColumn,
  propList: propListConfig,
  // 需要展开的菜单
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  }
};
