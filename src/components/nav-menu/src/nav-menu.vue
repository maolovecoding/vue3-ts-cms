<template>
  <div class="nav-menu">
    <div class="logo">
      <!-- 模板中使用路径简写 需要 ~ 开头 -->
      <img class="img" src="~@/assets/image/logo.svg" />
      <span v-show="!collapse" class="title">Vue3 + TS</span>
    </div>
    <el-menu
      :default-active="activeMenu.id + ''"
      class="el-menu-vertical"
      background-color="#0f2233"
      text-color="#b7bdc3"
      active-text-color="#6a82fb"
      unique-opened
      :collapse="collapse"
      @open="handleMenuActive"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template v-slot:title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                @click="handleMenuClick(subitem)"
                :index="subitem.id + ''"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { UserMenus } from "../../../service/type";
import { useStore } from "../../../store";
import { localCache } from "../../../utils";
import { NOT_FOUND_PAGE_PATH } from "../../../constant";
export default defineComponent({
  props: {
    // 菜单是否折叠
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    // 拿到login模块下的state数据
    const userMenus = computed<UserMenus[]>(() => store.state.login.userMenus);
    // 默认激活第一个菜单
    const activeMenu = ref<UserMenus>(
      localCache.getCache("activeMenu") ??
        // 默认激活第一个二级菜单
        (store.state.login.userMenus[0].children[0] as any)
    );
    // 菜单点击
    const handleMenuClick = (item: UserMenus) => {
      router.push(item.url ?? NOT_FOUND_PAGE_PATH);
      activeMenu.value = item;
      // TODO 老实说：这里异步最好 缓存本次激活的菜单到会话缓存中
      nextTick(() =>
        localCache.setCache("activeMenu", activeMenu.value, false)
      );
    };
    // 刷新页面时 回到默认页面 显示数据正常
    const handleMenuActive = () => {
      handleMenuClick(activeMenu.value);
    };
    return {
      userMenus,
      handleMenuClick,
      activeMenu,
      handleMenuActive
    };
  }
});
</script>

<style scoped lang="less">
@import "../../../style/_var.less";
// 混合
.selectActiveColor {
  color: white !important;
}

.nav-menu {
  height: 100%;
  // width: 100%;

  // logo 布局
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }

  .el-menu-vertical {
    // 没有设置100%, 右边会突出（因为子布局比父亲大）
    width: 100%;
    border-right: none;

    // 目录
    .el-sub-menu {
      // 二级菜单 ( 默认背景 )
      .el-menu-item {
        padding-left: 50px !important;
        background-color: @side-lighten-bg-color !important;
      }
    }

    // hover 高亮
    .el-menu-item:hover {
      .selectActiveColor(); // 菜单
    }

    .el-menu-item:hover i::before {
      .selectActiveColor(); // 菜单 icon
    }

    .el-sub-menu__title:hover span {
      .selectActiveColor(); // 目录
    }

    .el-sub-menu__title:hover i::before {
      .selectActiveColor(); // 目录 icon
    }

    // 二级菜单选中
    .el-menu-item.is-active {
      color: white !important;
      background-color: @side-sel-bg-color !important;
    }
  }
}
</style>
