<template>
  <div class="goods">
    <PageContent
      :page-name="pageName"
      :content-table-config="pageContentConfig"
    >
      <template #imgUrl="scope">
        <el-image
          style="width: 100%; height: 100%"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          hide-on-click-modal
        />
      </template>
      <template #oldPrice="scope"> ￥{{ scope.row.oldPrice }} </template>
      <template #status="scope">
        {{ scope.row.status === 1 ? "上线" : "下线" }}
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from "@/components/page-content";
import pageContentConfig from "./config/content.config";
const pageName = "goods";
</script>

<style scoped lang="less"></style>
