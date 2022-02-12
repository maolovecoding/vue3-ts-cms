import { ref, Ref } from "vue";
import PageContent from "@/components/page-content";
export function usePageSearch(): [
  Ref<InstanceType<typeof PageContent>>,
  (formData: any) => void,
  () => void
] {
  const pageContentRef = ref<InstanceType<typeof PageContent>>();
  const handleQueryClick = (formData: any) => {
    pageContentRef.value?.getPageData(formData);
  };
  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  return [pageContentRef, handleQueryClick, handleResetClick];
}
