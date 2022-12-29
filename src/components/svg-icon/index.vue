<!--
@author: xietiansheng
-->
<template>
  <svg v-bind="$attrs" :width="width" :height="height" aria-hidden="true">
    <use :href="href" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name?: string;
    prefix?: string;
    color?: string;
    width?: number | string;
    height?: number | string;
  }>(),
  {
    name: "",
    prefix: "",
    color: "#333",
    width: 30,
    height: 30,
  }
);

const href = computed(() => {
  return "#icon-" + props.name;
});
</script>
<script lang="ts">
export default { name: "SvgIcon" };
</script>

<style lang="less" scoped></style>
