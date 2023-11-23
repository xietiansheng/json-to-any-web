<template>
  <div class="overflow-auto bg-[#1a1a1a]">
    <div class="markdown-wrap" v-html="compiledMarkdown" />
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from "vue";
import { Marked } from "marked";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import "./style/code.css";

// 引入 highlight.js 的样式
const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs code-wrap language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const props = withDefaults(
  defineProps<{
    value: string;
  }>(),
  {}
);

const { value: markedText } = toRefs(props);

const compiledMarkdown = computed(() => {
  return marked.parse(markedText.value);
});
</script>

<style lang="scss" scoped>
:deep(.markdown-wrap) {
  background-color: #1a1a1a;
  font-size: 14px;
  > pre {
    margin: 0;
    padding: 0;
    height: 100%;
  }
}
:deep(.code-wrap) {
  height: 100%;
}

:deep(.hljs) {
  color: #a9b7c6;
  font-size: 14px;
  line-height: 1.6;
  background: transparent;
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
}
</style>
