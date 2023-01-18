<!--
@author: xietiansheng
-->
<template>
  <el-badge :is-dot="badgeDotVisible" class="item">
    <el-icon
      class="el-icon--right cursor-pointer"
      style="position: relative; top: 2px; right: 2px"
      @click="handleIconClick"
      ><Setting
    /></el-icon>
  </el-badge>

  <el-dialog v-model="dialogFormVisible" title="生成规则配置" width="370">
    <el-form :model="form" label-position="top">
      <el-form-item :label-width="formLabelWidth">
        <template #label
          >格式化拼接字符
          <el-tooltip
            class="box-item"
            effect="dark"
            content="遇到下列分隔符将自动删除，并转为小驼峰拼接"
            placement="top-start"
          >
            <el-icon style="color: #aaaaaa; position: relative; top: 2px"
              ><InfoFilled
            /></el-icon> </el-tooltip
        ></template>
        <el-select
          v-model="jointSymbolValues"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          clearable
          style="width: 100%"
          placeholder="输入 / 选择 需要处理的分隔符"
        >
          <el-option
            v-for="item in jointSymbolList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-link
          target="_blank"
          :underline="false"
          type="primary"
          class="pr-10px inline-block"
          href="https://github.com/xietiansheng/json-to-any-web/issues"
        >
          <span class="pr-18px">（需求/bug反馈）</span>
        </el-link>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Setting, InfoFilled } from "@element-plus/icons-vue";
import { jointSymbolList } from "@/config";
import { useCommonStore } from "@/store/common";
const { jointSymbolValues, badgeDotVisible } = toRefs(useCommonStore());

const dialogFormVisible = ref(false);
function handleIconClick() {
  badgeDotVisible.value = false;
  dialogFormVisible.value = true;
}

const form = ref({});
const formLabelWidth = 120;
</script>

<style lang="less" scoped></style>
