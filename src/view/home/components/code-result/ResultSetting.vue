<!--
@author: xietiansheng
-->
<template>
  <el-badge :is-dot="badgeDotVisible !== BadgeVersion" class="item">
    <el-icon
      class="el-icon--right cursor-pointer"
      style="position: relative; top: 2px; right: 2px"
      @click="handleIconClick"
      ><Setting
    /></el-icon>
  </el-badge>

  <el-dialog v-model="dialogFormVisible" title="规则配置" width="800">
    <el-tabs type="card">
      <el-tab-pane label="实体名称规则">
        <code-editor
          ref="entityNameCodeRef"
          :value="entityNameCode"
          :source-json="{}"
          type="entity"
        />
      </el-tab-pane>
      <el-tab-pane label="属性名称规则">
        <code-editor
          ref="propertyNameCodeRef"
          :value="propertyNameCode"
          type="property"
        />
      </el-tab-pane>
      <el-tab-pane label="使用文档">
        <CodeDoc />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <span class="flex items-center justify-end">
        <el-dropdown>
          <div class="">
            <el-link type="primary" :underline="false"
              >（需求/bug反馈）</el-link
            >
            <el-icon class="el-icon--right"><arrow-down /> </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                ><el-link
                  target="_blank"
                  :underline="false"
                  class="pr-10px inline-block"
                  href="https://gitee.com/XieTS/json-to-any-web/issues"
                >
                  <span class="pr-18px">gitee</span>
                </el-link></el-dropdown-item
              >
              <el-dropdown-item
                ><el-link
                  target="_blank"
                  :underline="false"
                  class="pr-10px inline-block"
                  href="https://github.com/xietiansheng/json-to-any-web/issues"
                >
                  <span class="pr-18px">github</span>
                </el-link></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="info" @click="onResetCode">恢复到默认</el-button>
        <el-button type="primary" @click="onConfirmClick">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
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
