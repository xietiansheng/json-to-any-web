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
          v-for="item in curCodeTypeList"
          :key="item.value"
          @click="handleCodeTypeChanged(item)"
          >{{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { useCommonStore } from "@/store/common";
import { CaretBottom } from "@element-plus/icons-vue";
import { codeTypeList } from "@/config";
import { CodeType } from "@/types/code-type";

const commonStore = useCommonStore();
const curCodeTypeList = Array.from(codeTypeList);

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
