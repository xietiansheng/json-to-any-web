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
    badgeDotVisible: boolean;
    entityNameCode: string;
    propertyNameCode: string;
  } => ({
    curCodeType: "Typescript",
    resultSetting: {},
    badgeDotVisible: true,
    entityNameCode: defaultEntityNameCode,
    propertyNameCode: defaultPropertyNameCode,
  }),
  getters: {},
  actions: {},
  persist: true,
});
