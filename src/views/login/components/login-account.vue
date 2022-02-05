<template>
  <el-form
    ref="formRef"
    :model="account"
    :rules="rules"
    status-icon
    label-width="80px"
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="account.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="account.password"
        type="password"
        autocomplete="off"
        show-password
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from "vue";
// 表单校验规则
import { rules } from "../config/account-config";
// More info see https://github.com/element-plus/element-plus/blob/dev/docs/examples/form/utils.ts
// import { resetForm, submitForm } from './utils'
import type { ElForm } from "element-plus";
import type { Account } from "../types";
import { localCache } from "../../../utils";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>();
    // 表单数据
    const account: Account = reactive<Account>(
      localCache.getCache<Account>("account") ?? {
        name: "coderwhy",
        password: "123456"
      }
    );
    const store = useStore();
    // 登录逻辑
    const loginAction = (isKeepPassword: boolean) => {
      // 校验表单
      (formRef.value as any)
        .validate()
        .then(() => {
          // 校验成功 可登录
          if (isKeepPassword) {
            // 记住了密码 则进行本地缓存
            localCache.setCache<Account>("account", account);
          } else {
            // 清除缓存
            localCache.deleteCache("account");
          }
          // 登录
          store.dispatch("login/accountLoginAction", { ...account });
        })
        .catch((err: any) => {
          // 校验失败 密码等格式不正确
          console.log("err :", err);
        });
    };
    return {
      account,
      loginAction,
      rules,
      formRef
    };
  }
});
</script>
