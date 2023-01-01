import { defineStore } from "pinia";
import { codeTypeList } from "@/view/home/code-type";

export const useCommonStore = defineStore("common", {
  state: () => ({
    curCodeType: codeTypeList[0] && codeTypeList[0],
  }),
  getters: {},
  actions: {},
});
