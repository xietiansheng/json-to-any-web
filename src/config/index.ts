import { Entity } from "json-to-any/dist/type/entity";
import { ToTypescript } from "@/config/code-ts";
import { ToJava } from "@/config/code-java";
import { ToDart } from "@/config/code-dart";
import { ToJsClass } from "@/config/code-jsclass";

export type CodeType = "Typescript" | "Java" | "Dart" | "JsClass";

export const defaultEntityNameCode =
  "name[0].toUpperCase() + name.slice(1, name.length)";

export const defaultPropertyNameCode = "toHump(name, ['_', '-', '.'])";
export const codeTypeList: CodeType[] = [
  "Typescript",
  "Java",
  "Dart",
  "JsClass",
];
export function generatorCode(codeType: CodeType, entities: Entity[]) {
  if (codeType === "Dart") {
    return ToDart(entities);
  }
  if (codeType === "Java") {
    return ToJava(entities);
  }
  if (codeType === "JsClass") {
    return ToJsClass(entities);
  }
  return ToTypescript(entities);
}

// 确保每次更新都能显示红点
export const BadgeVersion = "3";
