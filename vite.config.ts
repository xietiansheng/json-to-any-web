import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import WindiCSS from "vite-plugin-windicss";
import ViteEslint from "vite-plugin-eslint";
import { BeautifyConsole } from "beautify-console";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = mode !== "production";
  return {
    base: "/json-to-any-web/",
    define: {
      __SERVER_NAME__: `'${env.VITE_SERVER_NAME}'`,
      __DEV__: isDev,
    },
    plugins: [
      Vue(),
      WindiCSS(),
      ViteEslint(),
      BeautifyConsole({
        title: "JsonToAny",
        info: "Log",
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: "src/components.d.ts",
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@assets": resolve(__dirname, "src/assets"),
      },
    },
    server: { port: 5000 },
  };
});
