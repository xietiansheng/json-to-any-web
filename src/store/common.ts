import { defineStore } from "pinia";
import {
  CodeType,
  defaultEntityNameCode,
  defaultPropertyNameCode,
} from "@/config";

export const useCommonStore = defineStore("common", {
  state: (): {
    curCodeType: CodeType;
    resultSetting: Record<string, string>;
    badgeDotVisible: string;
    entityNameCode: string;
    propertyNameCode: string;
  } => ({
    curCodeType: "Typescript",
    resultSetting: {},
    badgeDotVisible: "1",
    entityNameCode: defaultEntityNameCode,
    propertyNameCode: defaultPropertyNameCode,
  }),
  getters: {},
  actions: {},
  persist: true,
});
