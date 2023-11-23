import { Entity } from "json-to-any/dist/type/entity";
import { ToTypescript } from "@/config/code-ts";
import { ToJava } from "@/config/code-java";
import { ToDart } from "@/config/code-dart";

export type CodeType = "Typescript" | "Java" | "Dart";

export const defaultEntityNameCode =
  "name[0].toUpperCase() + name.slice(1, name.length)";

export const defaultPropertyNameCode = "toHump(name, ['_', '-', '.'])";
export const codeTypeList: CodeType[] = ["Typescript", "Java", "Dart"];
export function generatorCode(codeType: CodeType, entities: Entity[]) {
  if (codeType === "Dart") {
    return ToDart(entities);
  }
  if (codeType === "Java") {
    return ToJava(entities);
  }
  return ToTypescript(entities);
}
