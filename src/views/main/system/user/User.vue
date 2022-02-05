<template>
  <div class="user">
    <div class="search">
      <!-- :formItems="formItems"
        :labelWidth="labelWidth"
        :itemStyle="itemStyle"
        :colLayout="colLayout"
      -->
      <!-- <MaoForm v-bind="formConfig" v-model:formData="formData">
        <template #header>
          <h1>高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button type="info" :icon="Refresh">重置</el-button>
            <el-button type="primary" :icon="Search">搜索</el-button>
          </div>
        </template>
      </MaoForm> -->
      <page-search :searchFormConfig="formConfig" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageSearch from "../../../../components/page-search";
import { formConfig } from "./config/search.config";
export default defineComponent({
  name: "User",
  components: { PageSearch },
  setup() {
    return { formConfig };
  }
});
</script>

<style scoped lang="less">
.content {
  padding: 5px 20px;
  border-top: transparent solid 1px;
  margin-top: 10px;
}
</style>
