<template>
  <div class="h-full">
    <home />
  </div>
</template>

<script setup lang="ts">
import Home from "@/view/home/home.vue";
import { useCommonStore } from "@/store/common";

function init() {
  // 旧版本兼容
  const commonStore = useCommonStore();
  if (typeof (commonStore.curCodeType as any) !== "string") {
    commonStore.curCodeType = "Typescript";
  }
}

init();
</script>

<style scoped lang="scss"></style>
