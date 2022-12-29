<template>
  <vue3-json-editor v-model="curValue" v-bind="$attrs" />
</template>
<script lang="ts" setup>
import { Vue3JsonEditor } from "vue3-json-editor";
import { computed } from "vue";

const emit = defineEmits(["update:value"]);

const props = defineProps<{
  value: {
    type: Record<any, any> | string;
  };
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
  .jsoneditor-outer {
    margin: 0;
    padding: 0;
    height: calc(100vh - 40px - 37px);
  }

  .jsoneditor-poweredBy {
    display: none;
  }
}
</style>
