<template>
  <el-row class="toolbar-wrapper">
    <el-col :span="24" class="flex items-center">
      <div class="flex items-center">
        <el-link
          href="https://www.npmjs.com/package/json-to-any"
          target="_blank"
          :underline="false"
          type="primary"
        >
          <div class="logo-block">
            <img src="../../../assets/images/logo.png" />
          </div>
        </el-link>
        <div class="title">JsonToAny</div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.toolbar-wrapper {
  height: $header-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 80px 0 10px;
  overflow: hidden;
  background-color: $main-bg-color;

  .logo-block {
    width: $header-height;
    height: $header-height;
    position: relative;
    overflow: hidden;
  }
}

.select-describe {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.title {
  font-size: 26px;
  margin-left: 4px;
  color: rgb(0, 188, 212);
  font-family: "Times New Roman", Times, serif;
}
</style>
