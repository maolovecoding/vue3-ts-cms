<template>
  <div class="page-search">
    <MaoForm v-bind="searchFormConfig" v-model:formData="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer="{ formRef }">
        <div class="handle-btns">
          <el-button type="info" :icon="Refresh" @click="handleReset(formRef)"
            >重置</el-button
          >
          <el-button type="primary" :icon="Search">搜索</el-button>
        </div>
      </template>
    </MaoForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Refresh, Search } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { MaoForm } from "@/base";

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { MaoForm },
  setup(props) {
    // const formRef = ref<InstanceType<typeof ElForm>>();
    const formItems = ref(props.searchFormConfig.formItems);
    const originFormData: any = {};
    // TODO 可以使用ts提取需要的字段
    for (const item of formItems.value) {
      originFormData[item.field] = "";
    }
    // 双向绑定的数据名称，是从表单配置的field字段决定的
    const formData = ref({ ...originFormData });
    // 重置点击
    const handleReset = (form: InstanceType<typeof ElForm> | undefined) => {
      console.log(formData);
      form?.resetFields();
      console.log(form);
      formData.value = { ...originFormData };
      console.log(formData);
    };
    return { formData, Refresh, Search, handleReset };
  }
});
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
