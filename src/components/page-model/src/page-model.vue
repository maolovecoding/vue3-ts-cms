<template>
  <div class="page-model">
    <el-dialog
      destroy-on-close
      title="新建用户"
      center
      v-model="isVisible"
      width="30%"
    >
      <MaoForm v-bind="modelConfig" v-model:formData="formData" />
      <!-- 预留插槽 -->
      <slot></slot>
      <template #footer>
        <el-button @click="isVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose, watch } from "vue";
import { MaoForm } from "@/base";
import { useStore } from "@/store";
const props = defineProps({
  modelConfig: {
    type: Object as any,
    required: true
  },
  defaultInfo: {
    type: Object as any,
    default: () => ({})
  },
  // 整合数据使用
  otherInfo: {
    type: Object as any,
    default: () => ({})
  },
  pageName: {
    type: String,
    required: true
  }
});
const isVisible = ref(false);
// 模态框数据
const formData = ref<any>({});
for (const item of props.modelConfig.formItems) {
  formData.value[item.field] = "";
}
const store = useStore();
const handleConfirmClick = () => {
  isVisible.value = false;
  // default is {}
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.dispatch("system/editPageDataAction", {
      pageName: props.pageName,
      pageData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    });
  } else {
    // 新建
    store.dispatch("system/createPageDataAction", {
      pageName: props.pageName,
      pageData: { ...formData.value, ...props.otherInfo }
    });
  }
};
// 监听需要进行数据回显的表单
watch(
  () => props.defaultInfo,
  (newVal) => {
    for (const item of props.modelConfig.formItems) {
      formData.value[item.field] = newVal[item.field];
    }
  }
);
defineExpose({
  isVisible
});
</script>

<style scoped></style>
