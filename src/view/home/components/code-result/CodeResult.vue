<script setup lang="ts">
import CodeTypeSelector from "@/view/home/components/code-result/CodeTypeSelector.vue";
import MarkdownPreview from "@/components/markdown-preview/MarkdownPreview.vue";
import ResultSetting from "@/view/home/components/code-result/ResultSetting.vue";
import { toRefs } from "vue";
const props = withDefaults(
  defineProps<{
    codeText: string;
  }>(),
  {}
);

const { codeText } = toRefs(props);
</script>

<template>
  <div class="flex flex-col flex-1 h-full">
    <div class="result-header h-35px min-h-35px text-white flex items-center">
      <ResultSetting />
      <CodeTypeSelector class="pl-10px" />
    </div>
    <MarkdownPreview :value="codeText" class="flex-1 h-full" />
  </div>
</template>

<style scoped lang="scss">
.result-header {
  background-color: $main-bg-color;
  padding: 0 16px 0 5px;
}
</style>
