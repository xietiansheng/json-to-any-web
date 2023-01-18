<template>
  <mark-down-editor
    v-model="mdText"
    class="mark-down-container"
    preview-only
    theme="dark"
  />
</template>

<script lang="ts" setup>
import MarkDownEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";

const emit = defineEmits(["update:value"]);
const props = withDefaults(
  defineProps<{
    value: string;
  }>(),
  {}
);
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
.mark-down-container {
  height: $code-wrapper-height;
  :deep(.md-editor-content) {
    .md-editor-preview-wrapper {
      background-color: #1a1a1a !important;
    }
  }
}
</style>
