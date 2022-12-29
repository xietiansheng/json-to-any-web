import { createApp } from "vue";
import App from "./App.vue";
// import "@/styles/index.scss";
// 注入原子化css
import "virtual:windi.css";
// 注入svg虚拟组件
import "virtual:svg-icons-register";
import { createPinia } from "pinia";
// pinia 数据持久化
import persistedState from "pinia-plugin-persistedstate";
// element-plus
import "element-plus/dist/index.css";
// 暗黑模式
import "element-plus/theme-chalk/dark/css-vars.css";

const pinia = createPinia();

pinia.use(persistedState);
const app = createApp(App);
app.use(pinia);
app.mount("#app");
