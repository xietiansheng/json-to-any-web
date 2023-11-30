<script setup lang="ts">
import { toRefs } from "vue";
import MarkdownPreview from "@/components/markdown-preview/MarkdownPreview.vue";
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
      代码运行结果
    </div>
    <markdown-preview :value="codeText" class="flex-1" />
    <!--  复制  -->
    <div class="absolute right-10px top-40px p-10px color-white">
      <copy-code :code-text="codeText" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
