<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item of breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import type { BreadcrumbType } from "./types";
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<BreadcrumbType[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="less"></style>
