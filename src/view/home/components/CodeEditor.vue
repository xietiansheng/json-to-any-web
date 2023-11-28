<script setup lang="ts">
import { parse } from "json-to-any";
import { generatorCode } from "@/config";
import { computed, ref, watch } from "vue";
import { ElAlert } from "element-plus";
import MarkdownPreview from "@/components/markdown-preview/MarkdownPreview.vue";
import { Entity } from "json-to-any/dist/type/entity";
import { getCodeResult } from "@/utils/code-util";
import { useCommonStore } from "@/store/common";
import { storeToRefs } from "pinia";

const props = withDefaults(
  defineProps<{
    value: string;
    type: "entity" | "property";
    sourceJson?: string | Record<any, any>;
  }>(),
  {
    value: "",
    type: "entity",
    sourceJson: () => ({
      first_name: "Mario",
      last_name: "Xie",
    }),
  }
);

const curValue = ref(props.value);
watch(
  () => props.value,
  (newVal) => {
    curValue.value = newVal;
    reset();
  }
);

const errMessage = ref("");

const codeResult = ref("");

let entities: Entity[] = [];

const oldResult = ref("");
const fullCode = computed(() => {
  return (
    "```ts" +
    `\nfunction ${
      props.type === "entity" ? "setEntityName" : "setPropertyName"
    }(name, toUpper, toHump) {` +
    `\n  return ${curValue.value}` +
    "\n}" +
    "\n```"
  );
});

/** ---------------> 代码生成与重置 <------------------ **/

const { curCodeType } = storeToRefs(useCommonStore());
watch(
  () => curCodeType.value,
  () => {
    reset();
    generatorNewCode();
  }
);
function reset() {
  entities = parse(props.sourceJson);
  oldResult.value = generatorCode(curCodeType.value, entities);
}

/** ---------------> 最新生成代码 <------------------ **/
function generatorNewCode() {
  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    try {
      if (props.type === "entity") {
        entity.name = getCodeResult(entity.name, curValue.value);
      } else {
        entity.properties.forEach((property) => {
          property.key = getCodeResult(property.key, curValue.value);
        });
      }
    } catch (error) {
      errMessage.value = (error as Error)?.message;
      return;
    }
  }
  errMessage.value = "";
  codeResult.value = generatorCode(curCodeType.value, entities);
}

function init() {
  reset();
}

init();

watch(
  curValue,
  (newVal) => {
    if (!newVal) {
      return;
    }
    reset();
    generatorNewCode();
  },
  {
    immediate: true,
  }
);

defineExpose({
  getCode: () => ({
    errMsg: errMessage.value,
    code: curValue.value,
  }),
});
</script>

<template>
  <div class="flex flex-col gap-10px">
    <div>输入代码</div>
    <el-input v-model="curValue" type="textarea" />
    <div>
      <div>实际执行代码</div>
      <el-alert
        v-if="errMessage"
        :description="`代码运行错误：${errMessage}`"
        :closable="false"
        type="error"
        class="mb-10px"
      />
      <markdown-preview :value="fullCode" class="rounded-6px overflow-hidden" />
    </div>
    <div class="flex gap-10px">
      <div class="flex-1 overflow-auto">
        <div>原始结果</div>
        <markdown-preview :value="oldResult" class="rounded-6px" />
      </div>
      <div class="flex-1 overflow-auto">
        <div>运行结果</div>
        <markdown-preview :value="codeResult" class="rounded-6px" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
