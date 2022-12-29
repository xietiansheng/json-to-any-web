import { defineConfig } from "vite-plugin-windicss";
// import colors from 'windicss/colors'

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      // 在这里自定义你的调色板
      colors: {
        main: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
        },
      },
      textColor: {
        main: "#409eff",
        info: "#909399",
        black: "#000000",
      },
    },
  },
  shortcuts: {
    "flex-center": "flex justify-center items-center",
    "text-title": "text-stone-500",
  },
});
