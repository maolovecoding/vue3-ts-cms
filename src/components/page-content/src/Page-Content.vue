<template>
  <div class="page-content">
    <MaoTable :listData="list" v-bind="contentTableConfig">
      <template v-slot:header-handle>
        <div>
          <el-button type="primary" plain>新建用户</el-button>
          <el-button type="primary" :icon="Refresh" plain>刷新</el-button>
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
      <template #operation>
        <el-button size="small" plain :icon="Edit" type="info">编辑</el-button>
        <el-button size="small" color="red" plain :icon="Delete" type="danger"
          >删除</el-button
        >
      </template>
    </MaoTable>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";
import { Edit, Delete, Refresh } from "@element-plus/icons-vue";
import { useStore } from "@/store";
import MaoTable from "@/base/table";
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
const store = useStore();
store.dispatch("system/getPageInfoAction", {
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
});
const list = computed(() =>
  // userList  roleList ...
  store.getters["system/pageListData"](props.pageName + "List")
);
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: #f5f5f5 solid 10px;
}
</style>
