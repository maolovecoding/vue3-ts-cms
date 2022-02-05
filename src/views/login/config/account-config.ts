import { reactive } from "vue";
// 表单校验规则
export const rules = reactive({
  name: [
    {
      required: true,
      message: "用户名是必填的",
      trigger: "blur"
    },
    {
      pattern: /^[0-9a-zA-Z]{5,12}$/,
      message: "用户名的长度在5-12之间",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "密码是必填的",
      trigger: "blur"
    },
    {
      pattern: /^[0-9a-zA-Z]{6,12}$/,
      message: "密码的长度在6-12之间",
      trigger: "blur"
    }
  ]
});
