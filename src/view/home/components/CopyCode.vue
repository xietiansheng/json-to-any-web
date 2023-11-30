<script setup lang="ts">
import { CopyDocument } from "@element-plus/icons-vue";
import useClipboard from "vue-clipboard3";
import { ElMessage } from "element-plus";

const props = defineProps<{
  codeText: string;
}>();

const { toClipboard } = useClipboard();
async function onCopyClick() {
  const codeText = props.codeText.replaceAll(/```[\s\S]*?\n|\n```/g, "");
  await toClipboard(codeText);
  ElMessage.success("复制成功");
}
</script>

<template>
  <div
    class="text-white cursor-pointer text-md flex-center gap-xs"
    @click="onCopyClick"
  >
    <el-icon><CopyDocument /></el-icon>复制代码
  </div>
</template>

<style scoped lang="scss"></style>
