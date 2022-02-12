<template>
  <div class="user">
    <div class="search">
      <page-search
        :searchFormConfig="formConfig"
        @queryBtnClick="handleQueryClick"
        @resetBtnClick="handleResetClick"
      />
      <div class="content">
        <PageContent
          ref="pageContentRef"
          :contentTableConfig="tableConfig"
          :pageName="pageName"
          @newBtnClick="handleNewData"
          @editBtnClick="handleEditData"
        />
      </div>
      <div class="page-model">
        <PageModel
          ref="pageModelRef"
          :modelConfig="modelConfigRef"
          :defaultInfo="defaultInfo"
          :pageName="pageName"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import PageModel from "@/components/page-model";
import { formConfig } from "./config/search.config";
import tableConfig from "./config/content.config";
import modelConfig from "./config/model.config";
import { usePageSearch, usePageModal } from "@/hooks";
import type { UserInfo } from "@/service/type";
import { useStore } from "@/store";
export default defineComponent({
  name: "User",
  components: { PageSearch, PageContent, PageModel },
  setup() {
    const pageName = "user";
    // 拿到隐藏列
    const passwordItem = modelConfig.formItems.find(
      (item) => item.field === "password"
    );
    // 新建用户时 执行的回调
    const newCallBack = () => {
      passwordItem!.isHidden = false;
    };
    // 编辑数据时 执行
    const editCallback = () => {
      passwordItem!.isHidden = true;
    };
    // 动态添加 部门和角色的选择框数据
    const store = useStore();
    // 数据变成响应式 在vuex请求到数据以后 自动刷新
    const modelConfigRef = computed(() => {
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modelConfig;
    });

    // use hook get fn and field
    const [pageContentRef, handleQueryClick, handleResetClick] =
      usePageSearch();
    const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal<UserInfo>(newCallBack, editCallback);
    return {
      formConfig,
      tableConfig,
      pageName,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modelConfigRef,
      handleNewData,
      handleEditData,
      pageModelRef,
      defaultInfo
    };
  }
});
</script>

<style scoped lang="less"></style>
