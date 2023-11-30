import { Property, PropertyType } from "json-to-any/dist/type/property";
import { AllVariableType } from "json-to-any/dist/type/variable-type";
import { CodeTypeTransform } from "@/types/code-type-item";
import { formatKey } from "@/utils/code-util";

export const ToJava: CodeTypeTransform = (entities) => {
  // // 将所有实体类名统一
  let code = "";
  entities.forEach((entity) => {
    // 处理 get set
    const getSetCode = entity.properties
      .map((property) => generatorGetSetCode(property))
      .join("\n");
    // 处理属性
    const propertyCode = entity.properties
      .map((property) => generatorPropertyCode(property) + ";")
      .join("\n");
    code += `public class ${entity.name} {\n${propertyCode}\n\n${getSetCode} \n}\n\n`;
  });
  return "```java\n" + code + "\n```";
};

function generatorGetSetCode(property: Property) {
  return (
    `  public ${getType(property)} get${formatKey(property.key).upKey}` +
    "() {\n" +
    `    return this.${property.key};` +
    "\n  }\n\n" +
    `  public void set${formatKey(property.key).upKey}` +
    `(${getType(property)} ${property.key}) {
` +
    `    this.${property.key} = ${property.key};` +
    "\n  }\n"
  );
}

function generatorPropertyCode(property: Property) {
  const { key, type, arrayExtend } = property;
  const showKey = key;
  let showType = getType(property);
  if (type === "object") {
    showType = property.objectExtend?.reference?.name || "Object";
  }
  return `  private ${showType} ${showKey}`;
}

const getJavaType = (type?: AllVariableType | PropertyType[]) => {
  const typeJavaMap = {
    string: "String",
    number: "double",
    boolean: "Boolean",
    object: "Object",
    array: "Array",
  };
  return typeJavaMap[type as keyof typeof typeJavaMap] || "Object";
};

function getType({ type, arrayExtend }: Property) {
  const javaType = getJavaType(type);
  if (type === "array") {
    const firstChild = arrayExtend?.types[0];
    if (firstChild?.reference) {
      return "Array<" + firstChild.reference.name + ">";
    }
    return "Array<" + getJavaType(firstChild?.type) + ">";
  }
  return javaType;
}
