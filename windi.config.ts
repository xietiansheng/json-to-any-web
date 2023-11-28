import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        dark: "var(--primary-bg-color)",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        base: "20px",
        xs: "12px ",
        sm: "12px",
        md: "14px",
        lg: "16px",
        xl: "18px",
        xxl: "20px",
      },
      sizes: {
        xs: "10px",
        sm: "12px",
        md: "14px",
        lg: "16px",
        xl: "18px",
        xxl: "20px",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        xxl: "36px",
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
  },
});
