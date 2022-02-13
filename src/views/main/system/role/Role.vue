<template>
  <div class="role">
    <PageSearch :search-form-config="formConfig" />
    <PageContent
      :page-name="pageName"
      :content-table-config="tableConfig"
      @new-btn-click="handleNewData"
      @edit-btn-click="handleEditData"
    />
    <PageModal
      :model-config="modalConfig"
      ref="pageModelRef"
      :page-name="pageName"
      :default-info="defaultInfo"
      :other-info="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </PageModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from "vue";
import { ElTree } from "element-plus";
import { getMenuLeafKeys } from "@/utils";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import tableConfig from "./config/content.config";
import { formConfig } from "./config/search.config";
import PageModal from "@/components/page-model";
import modalConfig from "./config/modal.config";
import { usePageModal } from "@/hooks";
import { useStore } from "@/store";
import type { RoleType } from "@/service/type";
const pageName = "role";
const store = useStore();
// 树形菜单对象ref
const elTreeRef = ref<InstanceType<typeof ElTree>>();
// 树形控件展示的数据
const menus = computed(() => store.state.entireMenu);
// tree展示的数据中 存放被选中的menu信息
const otherInfo = ref<any>({});
// tree 控件 复选框改变时触发
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys;
  const halfCheckedKeys = data2.halfCheckedKeys;
  // 将id传输给服务端即可
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  otherInfo.value = { menuList };
};
const editCallback = (item: RoleType) => {
  // 回显数据 给tree控件展示
  const menuLeafKeys = getMenuLeafKeys(item.menuList);
  // TODO 树形控件是在我们点击了编辑按钮以后 才会创建出来的 虽然此时已经获取到需要绑定的数据
  // 但是 控件对象此刻（点击的那个时间）还是空 ref对象还是undefined 所以无法调用到实例的方法
  // 所以需要在页面刷新以后才能绑定上，或者使用 setTimeout等
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(menuLeafKeys);
  });
};
const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
  undefined,
  editCallback
);
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 30px;
}
</style>
