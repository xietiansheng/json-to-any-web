<template>
  <div class="page-container flex-column">
    <toolbar />
    <el-row class="content-wrapper flex flex-1">
      <el-col :xs="24" :span="12">
        <json-editor
          v-model="jsonCode"
          class="flex-1"
          mode="code"
          @json-change="onJsonChanged"
        />
      </el-col>
      <el-col :xs="24" :span="12">
        <div class="flex-1" style="height: 100%">
          <markdown-editor v-model="mdCodeText" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Toolbar from "@/view/home/components/toolbar.vue";
import { useCommonStore } from "@/store/common";
import { codeTypeList } from "@/view/home/code-type";
import { storeToRefs } from "pinia";

const { codeTypeVal } = storeToRefs(useCommonStore());

const jsonCode = ref<string | object>({
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
const onJsonChanged = (json: string) => jsonToTs(json);
const mdCodeText = ref<string>("");
const jsonToTs = (json: string | Record<any, any>) => {
  const codeType = codeTypeList.find(
    (item) => item.value === codeTypeVal.value
  );
  if (codeType) {
    mdCodeText.value = "" + codeType.transform(json);
  }
};

watch(codeTypeVal, () => jsonToTs(jsonCode.value), {
  immediate: true,
});
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  overflow: hidden;
  flex-direction: column;

  .content-wrapper {
    overflow: hidden;
  }

  .page-header {
    height: 40px;
  }
}
</style>
