<template>
  <Vue3JsonEditor
    v-model="curValue"
    class="h-full overflow-hidden"
    v-bind="$attrs"
  />
</template>
<script lang="ts" setup>
import { Vue3JsonEditor } from "vue3-json-editor";
import { computed } from "vue";

const emit = defineEmits(["update:value"]);

const props = defineProps<{
  value: Record<any, any> | string;
}>();
const curValue = computed({
  get() {
    return props.value;
  },
  set(val) {
    emit("update:value", val);
  },
});
</script>

<style lang="scss" scoped>
:deep(.jsoneditor-vue) {
  height: 100%;

  .jsoneditor-contextmenu ul li button {
    color: white;
  }

  .jsoneditor {
    border: none;
  }

  .jsoneditor-menu {
    background-color: var(--primary-bg-color);
    border-bottom: none;
  }

  .jsoneditor-selected,
  .jsoneditor-selected:hover,
  .jsoneditor-contextmenu ul li button:hover {
    background-color: #8d9095;
  }

  .jsoneditor-outer {
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 0;
    top: 35px;
  }

  .jsoneditor-poweredBy {
    display: none;
  }

  .ace-jsoneditor .ace_scroller,
  .jsoneditor-outer,
  .jsoneditor-text {
    background-color: #f0f2f5;
  }
}
</style>
