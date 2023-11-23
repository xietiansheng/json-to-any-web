<template>
  <div class="page-wrapper bg-[#ecf5ff] overflow-hidden h-100vh flex-center">
    <div
      class="container relative overflow-hidden mx-auto flex flex-col rounded-xl"
      style="height: calc(100vh - 40px)"
    >
      <Toolbar />
      <el-row class="overflow-hidden flex flex-1">
        <el-col :xs="24" :span="12" class="relative h-full">
          <el-alert
            v-show="errorText"
            class="error-alert"
            :title="errorText"
            type="error"
            :closable="false"
            show-icon
            center
          />
          <JsonEditor
            v-model:value="jsonCode"
            class="flex-1 w-full"
            mode="code"
            @json-change="onJsonChanged"
            @has-error="onJsonError"
          />
        </el-col>
        <el-col :xs="24" :span="12" class="h-full overflow-hidden">
          <div class="flex flex-col flex-1 h-full">
            <div class="result-header h-35px min-h-35px">
              <ResultSetting />
              <CodeTypeSelector class="pl-10px" />
            </div>
            <MarkdownPreview v-model:value="mdCodeText" class="flex-1 h-full" />
          </div>
        </el-col>
      </el-row>
      <GithubLogo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";
import { getCodeResult } from "@/utils/code-util";
import { parse } from "json-to-any";
import MarkdownPreview from "@/components/markdown-preview/MarkdownPreview.vue";
import CodeTypeSelector from "@/view/home/components/CodeTypeSelector.vue";
import ResultSetting from "@/view/home/components/ResultSetting.vue";
import GithubLogo from "@/components/GithubLogo.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import Toolbar from "@/view/home/components/Toolbar.vue";
import { generatorCode } from "@/config";

const commonStore = useCommonStore();
const { curCodeType, entityNameCode, propertyNameCode } =
  storeToRefs(commonStore);

const jsonCode = ref<string | Record<any, any>>({
  title: "JsonToAny 示例JSON (包含所有数据格式)",
  gitee: "https://gitee.com/XieTS/json-to-any-web",
  orgId: 789,
  orgCode: null,
  centerState: false,
  info: {
    address_code: "自动格式化下划线",
    parent: {
      desc: "支持多层级对象嵌套",
    },
  },
  parent: {
    desc: "实体名称相同，所有属性名称相同，自动合并",
  },
  data: [{ content: "不同对象" }, { memo: "自动合并" }],
  strList: [1, "34", true],
  orderList: [{}, "包含对象的特殊数据做any处理", true],
  brand: [
    { name: "华为", price: 2000 },
    { name: "无价格", price: null },
  ],
});
const onJsonChanged = (json: string) => {
  jsonCode.value = json;
  errorText.value = "";
};
const mdCodeText = ref<string>("");
const jsonToCode = (json: string | Record<any, any>) => {
  const entities = parse(json);
  // 将所有实体类名统一设置为大驼峰
  entities.forEach((entity) => {
    entity.name = getCodeResult(entity.name, entityNameCode.value);
    entity.properties.forEach((property) => {
      property.key = getCodeResult(property.key, propertyNameCode.value);
    });
  });
  mdCodeText.value = generatorCode(curCodeType.value, entities);
};

const errorText = ref("");
const onJsonError = (error: Error) => {
  errorText.value = error.message;
};

watch(
  [curCodeType, jsonCode, entityNameCode, propertyNameCode],
  () => jsonToCode(jsonCode.value),
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.page-wrapper {
  .container {
    box-shadow: #909399 4px 10px 60px;

    .result-header {
      height: 35px;
      color: white;
      background-color: $main-bg-color;
      display: flex;
      align-items: center;
      padding: 0 16px 0 5px;
    }
  }

  .error-alert {
    position: absolute;
    top: 0;
    z-index: 10;
  }

  .relative {
    position: relative;
  }
}
</style>
