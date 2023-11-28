<template>
  <div
    class="page-wrapper bg-[#ecf5ff] overflow-hidden h-100vh flex-center flex-col"
  >
    <div
      class="container relative overflow-hidden mx-auto flex flex-col rounded-xl"
      style="height: calc(100vh - 40px)"
    >
      <ElAlert
        v-show="errorText"
        :title="errorText"
        type="error"
        show-icon
        class="error-alert"
        center
      />
      <Toolbar />
      <el-row class="overflow-hidden flex-1">
        <ElCol :xs="12" :span="12" class="h-full">
          <div class="flex flex-col h-full overflow-hidden">
            <div class="flex-1 overflow-auto">
              <JsonEditor
                v-model:value="jsonCode"
                mode="code"
                @json-change="onJsonChanged"
                @has-error="onJsonError"
              />
            </div>
            <div class="max-h-200px flex flex-col">
              <ElInput
                v-model="filterCodeInputVal"
                class="filter-input"
                type="textarea"
                clearable
                :autosize="{ minRows: 1, maxRows: 3 }"
                placeholder="代码过滤，例：data.map((item)=>item.name)"
                @click="onFilterCodeInputClick()"
              />
              <div class="flex-1 h-100px relative">
                <div
                  class="flex-center py-4px text-14px cursor-pointer gap-4px text-white"
                  style="position: absolute; top: 20px; right: 20px"
                  @click="closeFilterResult()"
                >
                  收起<el-icon
                    ><DArrowRight style="transform: rotate(90deg)"
                  /></el-icon>
                </div>
                <Transition name="slide-fade">
                  <MarkdownPreview
                    v-show="showFilterResult"
                    :value="fullFilterCode"
                    class="h-full"
                    style="
                      border-right: 1px solid #f5f5f5;
                      transition: all 0.3s;
                    "
                  />
                </Transition>
              </div>
            </div>
          </div>
        </ElCol>
        <ElCol :xs="12" :span="12" class="overflow-hidden relative">
          <CodeResult :code-text="mdCodeText" />
          <Transition name="slide-fade">
            <CodeFilterResult
              v-show="showFilterResult"
              :code-text="filterCode"
              :json-code="jsonCode"
              style="
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background-color: white;
                z-index: 100;
                transition: all 0.3s;
              "
            />
          </Transition>
        </ElCol>
      </el-row>
      <GithubLogo />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";
import { getCodeResult } from "@/utils/code-util";
import { parse } from "json-to-any";
import GithubLogo from "@/components/GithubLogo.vue";
import JsonEditor from "@/components/JsonEditor.vue";
import Toolbar from "@/view/home/components/Toolbar.vue";
import { generatorCode } from "@/config";
import CodeResult from "@/view/home/components/code-result/CodeResult.vue";
import CodeFilterResult from "@/view/home/components/code-filter-result/CodeFilterResult.vue";
import { DArrowRight } from "@element-plus/icons-vue";

const commonStore = useCommonStore();
const { curCodeType, entityNameCode, propertyNameCode } =
  storeToRefs(commonStore);

const jsonCode = ref<string | AnyObject>({
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

/** ---------------> 底部过滤代码相关 <------------------ **/
const filterCodeInputVal = ref("");
const filterCode = computed(() => {
  if (!filterCodeInputVal.value) {
    return (
      "" +
      "\n<p style='padding: 10px;font-size: 16px;color:#f0f2f5'>🧑‍💻：" +
      `<span style='color: #a9b7c6;'>请在左侧输入框，输入js过滤代码，例如：</span></p>` +
      "\n<p style='padding: 10px;font-size: 16px;color:#f0f2f5'>✅：" +
      `<span style='color: #a9b7c6;'>data.filter(item=>item.age>20)</span></p>` +
      "\n<p style='padding: 10px;font-size: 16px;color:#f0f2f5'>✅：" +
      `<span style='color: #a9b7c6;'>data.reduce((pre,item) => pre+=item.brand, "")</span></p>` +
      "\n<p style='padding: 10px;font-size: 16px;color:#f0f2f5'>✅：" +
      `<span style='color: #a9b7c6;'>......</span></p>` +
      ""
    );
  }
  const value = filterCodeInputVal.value;
  try {
    let result = new Function("data", `return ${value}`)(jsonCode.value);
    if (typeof result === "object") {
      result = JSON.stringify(result, null, 2);
    }
    return "```json" + `\n${result || "// undefined"}` + "\n```";
  } catch (e: any) {
    return (
      "\n<p style='padding: 10px;font-size: 16px;color:#f0f2f5'>🚨：" +
      `<span style='color: #f56c6c;'>${e.message}</span>` +
      "</p>"
    );
  }
});
const showFilterResult = ref(false);
function closeFilterResult() {
  showFilterResult.value = false;
}
function onFilterCodeInputClick() {
  showFilterResult.value = true;
}

const fullFilterCode = computed(() => {
  return (
    "```ts" +
    "\n// 完整运行代码" +
    "\nfunction filterJson(data: any) {" +
    `\n  return ${filterCodeInputVal.value}` +
    "\n}" +
    "\n```"
  );
});

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
  }

  .error-alert {
    position: absolute;
    top: 0;
    z-index: 100;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transition: all 0.3s;
  transform: translateY(100px);
}
</style>
