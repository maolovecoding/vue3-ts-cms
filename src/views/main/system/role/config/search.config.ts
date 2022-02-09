import type { FormItem, FormType } from "@/base";
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
    label: "权限介绍",
    placeholder: "请输入权限介绍"
  },
  {
    field: "createTime",
    type: "datepicker",
    label: "创建时间",
    datePickerOptions: {
      type: "daterange",
      startPlaceholder: "起始时间",
      endPlaceholder: "结束时间",
      format: "YYYY-MM-DD"
    }
  }
];
const itemStyle = {
  "padding-left": " 20px"
};
const labelWidth = "90px";
const colLayout = {
  xl: 6,
  lg: 8,
  md: 12,
  sm: 24,
  xs: 24
};
const formConfig: FormType = {
  formItems,
  itemStyle,
  labelWidth,
  colLayout
};

export { formConfig };
