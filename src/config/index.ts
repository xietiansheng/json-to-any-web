import { ToTypescript } from "@/config/code-ts";
import { ToJava } from "@/config/code-java";
import { ToDart } from "@/config/code-dart";
import { CodeType } from "@/types/code-type";

export const jointSymbolList = [
  { label: "-", value: "-" },
  { label: "_", value: "_" },
  { label: ".", value: "." },
];
export const codeTypeList: CodeType[] = [
  {
    label: "TypeScript",
    value: 1,
    transform: ToTypescript,
  },
  {
    label: "Java",
    value: 2,
    transform: ToJava,
  },
  {
    label: "Dart",
    value: 3,
    transform: ToDart,
  },
];
