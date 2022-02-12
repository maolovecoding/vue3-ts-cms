const propListConfig = [
  { prop: "name", label: "角色名", minWidth: "100", slotName: "name" },
  {
    prop: "intro",
    label: "权限介绍",
    minWidth: "100",
    slotName: "intro"
  },
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
const showIndexColumn = true;
const showSelectColumn = true;
const title = "角色列表";
export default {
  title,
  showIndexColumn,
  showSelectColumn,
  propList: propListConfig
};
