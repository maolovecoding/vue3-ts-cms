<template>
  <div class="form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      ref="formRef"
      :model="formdata"
      :label-width="labelWidth"
      label-position="left"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <!-- 特殊属性 需要隐藏 -->
            <el-form-item
              v-if="!item.isHidden"
              :rules="item.rules"
              :label="item.label"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :show-password="item.type === 'password'"
                  :type="item.type"
                  :placeholder="item.placeholder"
                  v-model="formdata[item.field]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  v-model="formdata[item.field]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.title"
                    :value="option.value"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formdata[item.field]"
                  style="width: 100%"
                  v-bind="item.datePickerOptions"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import { FormItem } from "../types";
export default defineComponent({
  props: {
    // 双向绑定数据
    formData: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ "padding-left": " 20px" })
    },
    // 动态布局样式
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ["update:formData"],
  setup(props, { emit }) {
    // 拷贝一份需要双向绑定的数据
    const formdata = ref({ ...props.formData });
    // TODO 真正的组件双向数据绑定 监听数据的改变 并发送出去给父组件 newVal 就是 formdata对象
    watch(formdata, (newVal) => emit("update:formData", newVal), {
      deep: true
    });
    return {
      formdata
    };
  }
});
</script>

<style scoped lang="less">
.form {
  padding: 20px 10px;
}
</style>
