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
      <el-table-column v-bind="item" align="center">
        <template #default="scope">
          <!-- 动态插槽名 -->
          <slot :row="scope.row" :name="item.slotName">{{
            scope.row[item.prop]
          }}</slot>
        </template>
      </el-table-column>
      <div class="footer">
        <slot name="footer">
          <!-- <el-pagination
            v-model:currentPage="currentPage1"
            :page-size="100"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, prev, pager, next"
            :total="1000"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination> -->
        </slot>
      </div>
    </template>
  </el-table>
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
    }
  },
  emits: ["selectionChange"],
  setup(props, { emit }) {
    // 选中行的数据 回调参数是选中的行的数据 默认是数组形式
    const handleSelectChange = (selection: User[]) => {
      emit("selectionChange", selection);
    };
    return { handleSelectChange };
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
</style>
