<template>
  <div class="role">
    <PageSearch :search-form-config="formConfig" />
    <PageContent :page-name="pageName" :content-table-config="tableConfig" />
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import tableConfig from "./config/content.config";
import { formConfig } from "./config/search.config";
const pageName = "role";
</script>

<style scoped lang="less"></style>
