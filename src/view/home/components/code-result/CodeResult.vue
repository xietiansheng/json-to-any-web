<script setup lang="ts">
import CodeTypeSelector from "@/view/home/components/code-result/CodeTypeSelector.vue";
import MarkdownPreview from "@/components/markdown-preview/MarkdownPreview.vue";
import ResultSetting from "@/view/home/components/code-result/ResultSetting.vue";
import { toRefs } from "vue";
import CopyCode from "@/view/home/components/CopyCode.vue";

const props = withDefaults(
  defineProps<{
    codeText: string;
  }>(),
  {}
);

const { codeText } = toRefs(props);
</script>

<template>
  <div class="flex flex-col flex-1 h-full relative">
    <div class="bg-dark pl-sm h-35px min-h-35px text-white flex items-center">
      <result-setting />
      <code-type-selector class="pl-10px" />
    </div>
    <markdown-preview :value="codeText" class="flex-1 h-full" />
    <!--  复制  -->
    <div class="absolute right-10px top-40px p-10px color-white">
      <copy-code :code-text="codeText" />
    </div>
  </div>
</template>
