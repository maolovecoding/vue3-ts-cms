<template>
  <div class="dashboard"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { init } from "echarts";
import { useStore } from "@/store";
const store = useStore();
store.dispatch("dashboard/getDashboardDataAction");
</script>

<style scoped></style>
