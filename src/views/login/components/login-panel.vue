<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template v-slot:label>
          <span class="item">
            <el-icon :size="14"><Calendar /></el-icon>账号登录
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="item">
            <el-icon :size="14"><Cellphone /></el-icon>手机登录
          </span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>
    <!-- 控制面板 -->
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-button" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Calendar, Cellphone } from "@element-plus/icons-vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
const isKeepPassword = ref(true);
const accountRef = ref<InstanceType<typeof LoginAccount>>();
// 默认是账号登录
const currentTab = ref("account");
// 登录 需要进行一波校验 子组件验证
const handleLogin = () => {
  // 账号登录 还是 phone 登录
  if (currentTab.value === "account")
    accountRef.value?.loginAction(isKeepPassword.value);
  else {
    console.log("手机登录");
  }
};
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }

  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }

  .login-button {
    width: 100%;
    margin-top: 10px;
  }
  .el-link:hover {
    color: rgba(39, 163, 221, 0.486);
  }
}
.item {
  font-size: 16px;
  text-align: center;
  line-height: 16px;
}
</style>
