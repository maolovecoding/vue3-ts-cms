<template>
  <div class="menu">
    <PageContent
      :page-name="pageName"
      :content-table-config="pageContentConfig"
    />
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content";
import pageContentConfig from "./config/content.config";
const pageName = "menu";
</script>

<style scoped></style>
