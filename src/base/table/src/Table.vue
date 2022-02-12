<template>
  <div class="header">
    <slot name="header">
      <div class="title">{{ title }}</div>
    </slot>
    <slot name="header-handle"></slot>
  </div>
  <el-table
    stripe
    highlight-current-row
    :data="listData"
    border
    style="width: 100%"
    @selection-change="handleSelectChange"
    v-bind="childrenProps"
  >
    <el-table-column
      v-if="showSelectColumn"
      type="selection"
      width="80px"
      align="center"
    ></el-table-column>
    <el-table-column
      v-if="showIndexColumn"
      type="index"
      label="序号"
      width="80px"
      align="center"
    ></el-table-column>
    <template v-for="item in propList" :key="item.prop">
      <el-table-column v-bind="item" align="center" show-overflow-tooltip>
        <template #default="scope">
          <!-- 动态插槽名 -->
          <slot :row="scope.row" :name="item.slotName">{{
            scope.row[item.prop]
          }}</slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="footer">
    <slot name="footer">
      <el-pagination
        :currentPage="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[5, 10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="dataTotalCount"
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "@/service/type";
export default defineComponent({
  props: {
    listData: {
      type: Array as PropType<User[]>,
      required: true
    },
    dataTotalCount: {
      type: Number,
      required: true
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "默认标题"
    },
    page: {
      type: Object as any,
      required: true
    },
    childrenProps: {
      type: Object as any,
      default: () => ({})
    }
  },
  emits: ["selectionChange", "update:page"],
  setup(props, { emit }) {
    // 选中行的数据 回调参数是选中的行的数据 默认是数组形式
    const handleSelectChange = (selection: User[]) => {
      emit("selectionChange", selection);
    };
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };
    return { handleSelectChange, handleSizeChange, handleCurrentChange };
  }
});
</script>
<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.footer {
  display: flex;
  flex-direction: row-reverse;
  margin-right: 20px;
}
</style>
