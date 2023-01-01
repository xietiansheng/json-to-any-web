import { ToTypescript } from "@/view/home/code-type/code-ts";
import { ToJava } from "@/view/home/code-type/code-java";
import { ToDart } from "@/view/home/code-type/code-dart";

export interface CodeType {
  label: string;
  value: number;
  disabled?: boolean;
  describe?: string;
  transform: CodeTypeTransform;
}

export type CodeTypeTransform = (json: Record<any, any> | string) => string;

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
