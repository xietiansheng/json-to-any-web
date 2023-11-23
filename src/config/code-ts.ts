import { Property, PropertyType } from "json-to-any/dist/type/property";
import { AllVariableType } from "json-to-any/dist/type/variable-type";
import { CodeTypeTransform } from "@/types/code-type-item";

export const ToTypescript: CodeTypeTransform = (entities) => {
  // // 将所有实体类名统一
  let code = "";
  entities.forEach((entity) => {
    const propertyCode = entity.properties
      .map((property) => "\n" + generatorPropertyCode(property) + ";")
      .join("");
    code += `export interface ${entity.name} {${propertyCode} \n}\n\n`;
  });
  return "```ts\n" + code + "\n```";
};

function generatorPropertyCode(property: Property) {
  const { key, type, arrayExtend } = property;
  const connector = getConnector(property);
  let typeStr = getType(type);
  if (type === "array") {
    const types = arrayExtend?.types || [];
    const tsType = types.length > 1 ? `(${getType(types)})` : getType(types);
    return `  ${key}${connector}${tsType}[]`;
  }
  if (type === "object") {
    const refEntity = property.objectExtend?.reference;
    return `  ${key}${connector}${refEntity?.name}`;
  }
  // null 类型默认为 any | null
  if (typeStr === "null") {
    typeStr = "any | null";
  }
  return "  " + key + connector + typeStr;
}

function getConnector(property: Property) {
  return property.nullable ? "?: " : ": ";
}

function getType(type: AllVariableType | PropertyType[]) {
  if (Array.isArray(type)) {
    return type
      .map((item: any) => {
        if (item.type === "object") {
          return item.reference?.name;
        }
        return item.type;
      })
      .filter((item: any) => item !== "undefined")
      .join(" | ");
  }
  if (type === "null") {
    return "any";
  }
  return type;
}
