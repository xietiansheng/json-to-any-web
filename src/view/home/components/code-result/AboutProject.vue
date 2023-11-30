<script setup lang="ts"></script>

<template>
  <div class="about-project-wrap text-lg px-md">
    <p>
      <span class="title">✨项目背景：</span>由于本人之前从事过 Android、Dart
      之类的开发，每到一个新的领域，都需要安装 json
      转目标语言的开发工具插件，所以突发奇想，能不能做一个通用的 json
      转目标语言的工具呢？于是诞生了该项目。
    </p>
    <p>
      <span class="title">💥完善优化：</span>目前网站月均访问量
      2000+，感谢大家的支持，后续会抽空继续完善该项目，欢迎大家提出宝贵的意见和建议。
    </p>
    <p>
      如果觉得该项目对你有帮助，欢迎 Star （
      <el-link
        type="primary"
        href="https://github.com/xietiansheng/json-to-any-web"
        target="_blank"
        :underline="false"
        >github</el-link
      >
      /
      <el-link
        type="primary"
        href="https://gitee.com/XieTS/json-to-any-web"
        target="_blank"
        >gitee</el-link
      >），Star 便是项目持续 优化 的能量 ~~~
    </p>
    <p>项目bug / 需求反馈 可通过 github / gitee 提交 Issues</p>
  </div>
</template>

<style scoped lang="scss">
.about-project-wrap {
  p {
    margin-top: 10px;
    color: #333;
    font-size: 14px;

    .title {
      color: #666;
      font-size: 14px;
    }
  }
}
</style>
