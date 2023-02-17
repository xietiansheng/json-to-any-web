<template>
  <div class="page-wrapper overflow-hidden">
    <div class="container mx-auto flex-column rounded-xl my-20px">
      <toolbar />
      <el-row class="overflow-hidden flex flex-1">
        <el-col :xs="24" :span="12">
          <json-editor
            v-model:value="jsonCode"
            class="flex-1"
            mode="code"
            @json-change="onJsonChanged"
          />
        </el-col>
        <el-col :xs="24" :span="12">
          <div class="flex-1" style="height: 100%">
            <div class="result-header">
              <result-setting />
              <code-type-selector class="pl-10px" />
            </div>
            <markdown-editor v-model:value="mdCodeText" />
          </div>
        </el-col>
      </el-row>
      <github-logo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";
import { codeTypeList } from "@/config";

const { curCodeType, jointSymbolValues } = storeToRefs(useCommonStore());

const jsonCode = ref<string | Record<any, any>>({
  title: "JsonToAny 示例JSON (包含所有数据格式)",
  gitee: "https://gitee.com/XieTS/json-to-any-web",
  orgId: 789,
  orgCode: null,
  centerState: false,
  info: {
    address_code: "自动格式化下划线",
    parent: {
      name: "支持多层级对象嵌套",
    },
  },
  data: [{ content: "不同对象" }, { memo: "自动合并" }],
  strList: [1, 34],
  orderList: [{}, "特殊数据做any处理", true],
});
const onJsonChanged = (json: string) => (jsonCode.value = json);
const mdCodeText = ref<string>("");
const jsonToCode = (json: string | Record<any, any>) => {
  const codeType = codeTypeList.find(
    (item) => item.value === curCodeType.value.value
  );
  if (codeType) {
    mdCodeText.value = "" + codeType.transform(json);
  }
};

watch(
  [curCodeType, jsonCode, jointSymbolValues],
  () => jsonToCode(jsonCode.value),
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: #ecf5ff;
  min-height: 100vh;

  .container {
    box-shadow: #909399 4px 10px 60px;
    overflow: hidden;
    position: relative;

    .result-header {
      height: 35px;
      color: white;
      background-color: $main-bg-color;
      display: flex;
      align-items: center;
      padding: 0 16px 0 5px;
    }
  }
}
</style>
