<script setup lang="ts">
import { ref } from "vue";
import CodeEditor from "@/view/home/components/CodeEditor.vue";

const codeInputVal = ref("'X' + name.charAt(0).toUpperCase() + name.slice(1)");
const fastCodeInputVal = ref("'X' + toUpper(name)");
</script>

<template>
  <div class="flex flex-col gap-14px pl-10px pt-10px overflow-auto">
    <h2 class="text-18px font-bold">规则配置使用文档</h2>
    <div>支持使用js代码的方式控制生成结果的变量名称</div>
    <div>下面将演示代码规则的设置步骤，假设我们的需求如下：</div>
    <div>
      1、所有的实体名称需要<span class="font-bold">大驼峰，</span>并加上字母 X
      开头
    </div>
    <div>我们可以通过下面的代码来实现上面的需求：</div>
    <code-editor v-model:value="codeInputVal" type="entity" :source-json="{}" />
    <div>
      细心的朋友可能发现 function setName(name, toUpper, toHump)
      还有两个自带参数，这两个参数为系统内置方法
    </div>
    <div>首先介绍一下这两个内置方法</div>
    <div>toUpper(name)：将给定的字符串转换为大驼峰</div>
    <div>
      toHump(name,
      "_")：将给定的字符串，去除指定的分隔符(第二个参数)，并使用驼峰拼接
    </div>
    <div>我们可以通过内置的 toUpper 方法，实现同样的效果：</div>
    <code-editor
      v-model:value="fastCodeInputVal"
      type="entity"
      :source-json="{}"
    />
  </div>
</template>

<style scoped lang="scss"></style>
