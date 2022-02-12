import type { FormItem, FormType } from "@/base";
const formItems: FormItem[] = [
  {
    field: "id",
    type: "input",
    label: "Id",
    placeholder: "请输入Id"
  },
  {
    field: "name",
    type: "input",
    label: "用户名",
    placeholder: "请输入用户名"
  },
  {
    field: "realname",
    type: "input",
    label: "真实姓名",
    placeholder: "请输入真实姓名"
  },
  {
    field: "cellphone",
    type: "input",
    label: "电话号码",
    placeholder: "请输入电话号码"
  },
  {
    field: "enable",
    label: "用户状态",
    type: "select",
    placeholder: "请选择用户状态",
    options: [
      { title: "启用", value: 1 },
      { title: "禁用", value: 0 }
    ]
  },
  {
    field: "createAt",
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
