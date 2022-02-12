type FormItemType = "input" | "password" | "select" | "datepicker";
export interface FormItem {
  field: string;
  type: FormItemType;
  label: string;
  rules?: any[];
  placeholder?: string;
  // 额外的配置
  options?: OptionType[];
  // 日期组件 配置 参考ep
  datePickerOptions?: datePickerOptionType;
  // 特殊属性 比如 password 等 是否隐藏
  isHidden?: Boolean;
}

interface OptionType {
  title: string;
  value: any;
}

interface datePickerOptionType {
  startPlaceholder?: string;
  endPlaceholder?: string;
  type?: string;
  format?: string;
}

export interface FormType {
  formItems?: FormItem[];
  labelWidth?: string;
  colLayout?: Layout;
  // 样式
  itemStyle?: any;
}

interface Layout {
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  span?: number;
}
