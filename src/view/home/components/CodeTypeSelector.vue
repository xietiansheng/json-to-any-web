<!--
@author: xietiansheng
-->
<template>
  <el-dropdown :hide-on-click="false">
    <div class="el-dropdown-link">
      {{ commonStore.curCodeType.label
      }}<el-icon class="el-icon--right"><CaretBottom /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in codeTypeList"
          :key="item.key"
          @click="handleCodeTypeChanged(item)"
          >{{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { CodeType, codeTypeList } from "@/view/home/code-type";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();

const handleCodeTypeChanged = (codeType: CodeType) => {
  commonStore.curCodeType = codeType;
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  color: #f5f5f5;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
