import { createApp } from "vue";
import App from "./App.vue";
// 注入原子化css
import "virtual:windi.css";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// pinia 数据持久化
import persistedState from "pinia-plugin-persistedstate";
// element-plus
import "element-plus/dist/index.css";
import "@/styles/index.scss";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(persistedState);
const app = createApp(App);

app.use(pinia);
app.mount("#app");
