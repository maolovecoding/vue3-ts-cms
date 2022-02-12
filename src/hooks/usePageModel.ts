import { ref } from "vue";
import PageModel from "@/components/page-model";
type CallbackType = () => void;
export function usePageModal<T>(): any;
export function usePageModal<T>(newCallback: CallbackType): any;
export function usePageModal<T>(
  newCallback: CallbackType,
  editCallback: CallbackType
): any;
/**
 *
 * @param newCallback  pure function 新建 回调
 * @param editCallback pure function 编辑 回调
 * @returns
 */
export function usePageModal<T>(
  newCallback?: CallbackType,
  editCallback?: CallbackType
) {
  const pageModelRef = ref<InstanceType<typeof PageModel>>();
  const defaultInfo = ref<T>();
  // 新建
  const handleNewData = () => {
    // 确保数据不会回显 防止点击了编辑按钮回显的数据会出现到新建dialog出现
    defaultInfo.value = {} as T;
    if (pageModelRef.value) pageModelRef.value.isVisible = true;
    newCallback && newCallback();
  };
  // 编辑
  const handleEditData = (item: T) => {
    defaultInfo.value = { ...item };
    if (pageModelRef.value) pageModelRef.value.isVisible = true;
    editCallback && editCallback();
  };
  return [pageModelRef, defaultInfo, handleNewData, handleEditData] as const;
}
