<template>
  <mark-down-editor
    v-model="mdText"
    preview-only
    style="height: calc(100vh - 40px)"
    theme="dark"
  />
</template>

<script lang="ts" setup>
import MarkDownEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { computed } from "vue";

const emit = defineEmits(["update:value"]);
const props = defineProps<{
  value: {
    type: string;
  };
}>();
const mdText = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("update:value", val);
  },
});
</script>

<style lang="scss" scoped>
:deep(.md-editor-content) {
  .md-editor-preview-wrapper {
    background-color: #1a1a1a !important;
  }
}
</style>
