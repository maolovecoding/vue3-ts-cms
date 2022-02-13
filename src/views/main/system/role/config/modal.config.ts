import type { FormItem } from "@/base";
const formItems: FormItem[] = [
  {
    field: "name",
    type: "input",
    label: "角色名",
    placeholder: "请输入角色名"
  },
  {
    field: "intro",
    type: "input",
    label: "角色介绍",
    placeholder: "请输入角色介绍"
  }
];
const itemStyle = {
  "padding-left": " 0px"
};
const labelWidth = "90px";
const colLayout = {
  span: 24
};
export default {
  formItems,
  colLayout,
  labelWidth,
  itemStyle
};
