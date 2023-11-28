<!--
@author: xietiansheng
-->
<template>
  <el-dropdown :hide-on-click="false">
    <div class="text-md cursor-pointer flex-center text-white">
      {{ commonStore.curCodeType }}
      <el-icon class="el-icon--right">
        <caret-bottom />
      </el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="key in codeTypeList"
          :key="key"
          @click="commonStore.curCodeType = key"
          >{{ key }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useCommonStore } from "@/store/common";
import { CaretBottom } from "@element-plus/icons-vue";
import { codeTypeList } from "@/config";

const commonStore = useCommonStore();
</script>

<style lang="scss" scoped></style>
