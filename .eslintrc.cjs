module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    // 1. 接入 prettier 的规则
    "prettier",
    "plugin:prettier/recommended"
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "moudule",
    parser: "@typescript-eslint/parser"
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.vue"],
      rules: { "no-undef": "off" }
    }
  ],
  rules: {
    "no-console":
      process.env.NODE_ENV === "production"
        ? ["error", { allow: ["error", "warn"] }]
        : "off", //The production mode does not allow the use of log
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", //The production default does not allow the use of debugger
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: ".*", args: "none" }
    ], //variable declaration is not used
    "@typescript-eslint/no-explicit-any": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-model-argument": "off"
  }
};
