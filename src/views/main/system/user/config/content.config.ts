const propListConfig = [
  { prop: "name", label: "用户名", minWidth: "100", slotName: "name" },
  {
    prop: "realname",
    label: "真实姓名",
    minWidth: "100",
    slotName: "realname"
  },
  {
    prop: "cellphone",
    label: "手机号",
    minWidth: "100",
    slotName: "cellphone"
  },
  { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
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
const title = "用户列表";
export default {
  title,
  showIndexColumn,
  showSelectColumn,
  propList: propListConfig
};
