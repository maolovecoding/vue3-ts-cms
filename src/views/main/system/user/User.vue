<template>
  <div class="user">
    <div class="search">
      <page-search :searchFormConfig="formConfig" />
      <div class="content">
        <!--
          :propList="propListConfig"
          :showIndexColumn="showIndexColumn"
          :showSelectColumn="showSelectColumn"
          :title="title"
          -->
        <PageContent :contentTableConfig="tableConfig" :pageName="pageName" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import { formConfig } from "./config/search.config";
import tableConfig from "./config/content.config";
export default defineComponent({
  name: "User",
  components: { PageSearch, PageContent },
  setup() {
    const pageName = "user";
    return {
      formConfig,
      tableConfig,
      pageName
    };
  }
});
</script>

<style scoped lang="less">
.content {
  padding: 20px;
  border-top: #f5f5f5 solid 10px;
}
</style>
