<template>
  <div class="page-content">
    <MaoTable
      :listData="list"
      :dataTotalCount="dataTotalCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template v-slot:header-handle>
        <div>
          <el-button
            v-if="isCreate"
            type="primary"
            plain
            @click="handleNewClick"
            >新建用户</el-button
          >
          <el-button v-if="isQuery" type="primary" :icon="Refresh" plain
            >刷新
          </el-button>
        </div>
      </template>
      <template #status="scope">
        {{ scope.row.enable === 1 ? "启用" : "禁用" }}
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template v-if="isUpdate || isDelete" #operation="{ row }">
        <el-button
          v-if="isUpdate"
          size="small"
          plain
          :icon="Edit"
          type="info"
          @click="handleEditClick(row)"
          >编辑
        </el-button>
        <el-button
          v-if="isDelete"
          size="small"
          color="red"
          plain
          :icon="Delete"
          type="danger"
          @click="handleDeleteClick(row.id)"
          >删除
        </el-button>
      </template>
      <!-- 剩余的动态插槽 -->
      <!-- TODO 遍历注册动态插槽的同时 也将这些插槽作为MaoTable动态插槽的内容传进去 -->
      <template
        v-for="item of otherPropSlots"
        :key="item.slotName"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </MaoTable>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineProps,
  defineExpose,
  defineEmits,
  ref,
  watch
} from "vue";
import { Edit, Delete, Refresh } from "@element-plus/icons-vue";
import { useStore } from "@/store";
import MaoTable from "@/base/table";
import { QueryInfo } from "@/types";
import { usePermission } from "@/hooks";
const props = defineProps({
  // 表格显示数据的配置
  contentTableConfig: {
    type: Object as any,
    required: true
  },
  // 请求指定页面的数据
  pageName: {
    type: String,
    required: true
  }
});
const emit = defineEmits(["newBtnClick", "editBtnClick"]);
// 获取操作权限
const isCreate = usePermission(props.pageName, "create");
const isUpdate = usePermission(props.pageName, "update");
const isDelete = usePermission(props.pageName, "delete");
const isQuery = usePermission(props.pageName, "query");
// 获取其他的动态插槽名
const otherPropSlots = props.contentTableConfig.propList.filter((item: any) => {
  // if (item.slotName === "status") return false;
  if (item.slotName === "createAt") return false;
  if (item.slotName === "updateAt") return false;
  if (item.slotName === "operation") return false;
  return true;
});
const store = useStore();
// 双向绑定 pageInfo 请求的数据和分页时使用的数据有关联
const pageInfo = ref({ currentPage: 1, pageSize: 5 });
// 发起请求
const getPageData = (queryInfo: QueryInfo = {}) => {
  store.dispatch("system/getPageInfoAction", {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      // 合并请求参数
      ...queryInfo
    }
  });
};
// 监听分页相关数据 参数改变时需要重新请求数据
watch(pageInfo, () => getPageData());
// 首次加载页面时 加载数据
getPageData();
// 从 vuex中获取页面数据
const list = computed(() =>
  // userList  roleList ...
  store.getters["system/pageListData"](props.pageName + "List")
);
// 获取数据总条数
const dataTotalCount = computed(() =>
  store.getters["system/pageListDataTotalCount"](props.pageName + "Count")
);
// 删除操作
const handleDeleteClick = (id: number) => {
  store.dispatch("system/deletePageDataAction", {
    pageName: props.pageName,
    id
  });
};
// 新建按钮点击
const handleNewClick = () => {
  emit("newBtnClick");
};
// 编辑
const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};
// 暴露给外界的属性 方法等
defineExpose({
  getPageData
});
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: #f5f5f5 solid 10px;
}
</style>
