<template>
  <div class="page-search">
    <MaoForm v-bind="searchFormConfig" v-model:formData="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button type="info" :icon="Refresh">重置</el-button>
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </MaoForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Refresh, Search } from "@element-plus/icons-vue";
import { MaoForm } from "../../../base";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { MaoForm },
  setup() {
    const formData = ref({
      id: "",
      name: "",
      password: "",
      sport: "",
      createTime: ["", ""]
    });
    return { formData, Refresh, Search };
  }
});
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
