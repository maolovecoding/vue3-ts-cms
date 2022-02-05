import type { FormItem, FormType } from "../../../../../base";
const formItems: FormItem[] = [
  {
    field: "id",
    type: "input",
    label: "id",
    placeholder: "请输入id"
  },
  {
    field: "name",
    type: "input",
    label: "用户名",
    placeholder: "请输入用户名"
  },
  {
    field: "password",
    type: "password",
    label: "密码",
    placeholder: "请输入密码"
  },
  {
    field: "sport",
    label: "喜欢的运动",
    type: "select",
    placeholder: "请选择喜欢的运动",
    options: [
      { title: "篮球", value: "basketball" },
      { title: "足球", value: "football" }
    ]
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
