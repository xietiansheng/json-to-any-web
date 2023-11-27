import { Property } from "json-to-any/dist/type/property";
import { CodeTypeTransform } from "@/types/code-type-item";

const typeToDefValueMap = {
  string: "''",
  number: "0",
  boolean: "false",
  array: "[]",
  object: "{}",
  null: "null",
  undefined: "undefined",
};

export const ToJsClass: CodeTypeTransform = (entities) => {
  // // 将所有实体类名统一
  let code = "";
  entities.forEach((entity) => {
    const propertyCode = entity.properties
      .map((property) => generatorPropertyCode(property))
      .join("");
    code += `\nclass ${entity.name} {${propertyCode} \n}\n`;
  });
  return "```javascript\n" + code + "\n```";
};

function generatorPropertyCode(property: Property) {
  const { key, type, arrayExtend } = property;
  const connector = " = ";
  let curType = type;
  if (Array.isArray(type)) {
    // 多种类型的数组，取一个不是 undefined/null 的类型
    curType =
      type.find((item) => item.type !== "undefined" && item.type !== "null")
        ?.type || "string";
  }
  const defValue =
    typeToDefValueMap[curType as keyof typeof typeToDefValueMap] || "undefined";

  return "\n  " + key + connector + defValue + ";";
}
