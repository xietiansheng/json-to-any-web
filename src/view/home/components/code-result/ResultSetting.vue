<!--
@author: xietiansheng
-->

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Setting } from "@element-plus/icons-vue";
import { useCommonStore } from "@/store/common";
import CodeDoc from "@/view/home/components/code-result/CodeDoc.vue";
import CodeEditor from "@/view/home/components/CodeEditor.vue";
import { ElMessage } from "element-plus";
import {
  BadgeVersion,
  defaultEntityNameCode,
  defaultPropertyNameCode,
} from "@/config";
import { storeToRefs } from "pinia";
import AboutProject from "@/view/home/components/code-result/AboutProject.vue";

const commonStore = useCommonStore();
const { badgeDotVisible, entityNameCode, propertyNameCode } =
  storeToRefs(commonStore);

const dialogFormVisible = ref(false);

function handleIconClick() {
  badgeDotVisible.value = BadgeVersion;
  dialogFormVisible.value = true;
}

const entityNameCodeRef = ref<any>();
const propertyNameCodeRef = ref<any>();

/** ---------------> tabs与按钮相关 <------------------ **/
const curTab = ref("1");
const resetBtnVisible = computed(() => {
  return ["1", "2"].includes(curTab.value);
});

/** ---------------> 确定、保存配置 <------------------ **/
function onConfirmClick() {
  if (entityNameCodeRef.value) {
    const { errMsg, code } = entityNameCodeRef.value.getCode();
    if (errMsg) {
      ElMessage.error(errMsg);
      return;
    }
    entityNameCode.value = code;
  }
  if (propertyNameCodeRef.value) {
    const { errMsg, code } = propertyNameCodeRef.value.getCode();
    if (errMsg) {
      ElMessage.error(errMsg);
      return;
    }
    propertyNameCode.value = code;
  }
  dialogFormVisible.value = false;
}

function onResetCode() {
  commonStore.entityNameCode = defaultEntityNameCode;
  commonStore.propertyNameCode = defaultPropertyNameCode;
}
</script>

<template>
  <el-badge :is-dot="badgeDotVisible !== BadgeVersion" class="item">
    <el-icon
      class="el-icon--right cursor-pointer"
      style="position: relative; top: 2px; right: 2px"
      @click="handleIconClick"
    >
      <setting />
    </el-icon>
  </el-badge>

  <el-dialog v-model="dialogFormVisible" title="规则配置" width="800">
    <el-tabs v-model="curTab" type="card">
      <el-tab-pane label="实体名称规则" name="1">
        <code-editor
          ref="entityNameCodeRef"
          :value="entityNameCode"
          :source-json="{}"
          type="entity"
        />
      </el-tab-pane>
      <el-tab-pane label="属性名称规则" name="2">
        <code-editor
          ref="propertyNameCodeRef"
          :value="propertyNameCode"
          type="property"
        />
      </el-tab-pane>
      <el-tab-pane label="使用文档" name="3">
        <code-doc />
      </el-tab-pane>
      <el-tab-pane label="关于项目" name="4">
        <about-project />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="flex items-center justify-end">
        <el-button v-show="resetBtnVisible" class="info" @click="onResetCode"
          >恢复到默认</el-button
        >
        <el-button type="primary" @click="onConfirmClick">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin: 0;
}

:deep(.el-tab-pane) {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-top: none;
  max-height: 500px;
  overflow: auto;
}
</style>
