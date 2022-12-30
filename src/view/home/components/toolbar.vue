<template>
  <el-row class="toolbar-wrapper flex items-center px-2">
    <el-col :xs="21" :span="12" class="flex items-center">
      <div class="flex items-center">
        <el-link
          href="https://www.npmjs.com/package/json-to-any"
          target="_blank"
          :underline="false"
          type="primary"
        >
          <svg-icon name="logo" width="26" height="30" class="mr-2" />
        </el-link>
        <div class="flex-1 flex items-baseline">
          <h2>JsonToAny</h2>
          <div class="hint-text text-sm text-gray-500">
            （基于
            <el-link
              href="https://www.npmjs.com/package/json-to-any"
              target="_blank"
              :underline="false"
              type="primary"
            >
              json-to-any
            </el-link>
            开发）
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="0" :span="12">
      <div class="flex justify-end">
        <el-select v-model="commonStore.codeTypeVal" placeholder="选择语言">
          <el-option
            v-for="item in languageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          >
            <span class="float-left">{{ item.label }}</span>
            <span class="float-right select-describe">{{ item.describe }}</span>
          </el-option>
        </el-select>
      </div>
    </el-col>
    <el-col :xs="3" :span="0">
      <div class="flex justify-end">
        <el-dropdown ref="dropdown" trigger="contextmenu">
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item disabled>Action 4</el-dropdown-item>
              <el-dropdown-item divided>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-icon size="15" @click="showClick"></el-icon>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import SvgIcon from "@/components/svg-icon/index.vue";
import { codeTypeList } from "@/view/home/code-type";
import { useCommonStore } from "@/store/common";

const commonStore = useCommonStore();
const languageOptions = codeTypeList;

const dropdown = ref();
const showClick = () => {
  dropdown.value.handleOpen();
};
</script>

<style lang="scss" scoped>
.toolbar-wrapper {
  height: 40px;
}

.select-describe {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
</style>
