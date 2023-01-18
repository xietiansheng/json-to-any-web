import { defineStore } from "pinia";
import { codeTypeList, jointSymbolList } from "@/config";

export const useCommonStore = defineStore("common", {
  state: () => ({
    curCodeType: JSON.parse(JSON.stringify(codeTypeList[0])),
    resultSetting: {},
    jointSymbolValues: jointSymbolList.map((item) => item.value),
    badgeDotVisible: true,
  }),
  getters: {},
  actions: {},
  persist: true,
});
