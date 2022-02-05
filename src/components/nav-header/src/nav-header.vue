<template>
  <div class="nav-header">
    <el-icon @click="handleFoldMenu" class="fold-menu" :size="30">
      <Fold v-show="!isFoldMenu" />
      <Expand v-show="isFoldMenu" />
    </el-icon>
    <div class="content">
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <el-dropdown>
        <span class="el-dropdown">
          <el-avatar :size="24" :src="avatarUrl"></el-avatar>
          <span>{{ username }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出登录</el-dropdown-item>
            <el-dropdown-item divided>用户信息</el-dropdown-item>
            <el-dropdown-item>系统信息</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Fold, Expand } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { Breadcrumb } from "../../../base";
import type { BreadcrumbType } from "../../../base";
import { useStore } from "../../../store";
import { pathMapBreadcrumbs } from "../../../utils";
export default defineComponent({
  components: {
    Breadcrumb,
    Fold,
    Expand
  },
  emits: ["foldChange"],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRoute();
    const username = computed<string>(() => store.state.login.userInfo.name);
    const avatarUrl =
      "http://p1.music.126.net/UPq43R_bOnvmADDjjwMjmw==/109951163505490394.jpg?param=180y180";
    // 菜单折叠
    const isFoldMenu = ref(false);
    const handleFoldMenu = () => {
      isFoldMenu.value = !isFoldMenu.value;
      // 告诉父组件main 切换菜单折叠
      emit("foldChange", isFoldMenu.value);
    };
    // 面包屑
    const breadcrumbs = computed<BreadcrumbType[]>(() =>
      pathMapBreadcrumbs(store.state.login.userMenus, router.path)
    );
    return { username, avatarUrl, isFoldMenu, handleFoldMenu, breadcrumbs };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .fold-menu {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
    .el-dropdown {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      span:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
