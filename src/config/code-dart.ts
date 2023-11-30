import { Property, PropertyType } from "json-to-any/dist/type/property";
import { AllVariableType } from "json-to-any/dist/type/variable-type";
import { CodeTypeTransform } from "@/types/code-type-item";

export const ToDart: CodeTypeTransform = (entities) => {
  // // 将所有实体类名统一
  let code = "";
  entities.forEach((entity) => {
    // 处理属性
    const propertyCode = entity.properties
      .map((property) => generatorPropertyCode(property) + ";")
      .join("\n");
    // 处理构造函数
    const constructorCode =
      `\n  ${entity.name}({\n` +
      entity.properties
        .map((property) => "    this." + property.key + ",")
        .join("\n") +
      "\n  });\n";
    // 处理 fromJson
    const fromJsonCode =
      `  ${entity.name}.fromJson(Map<String, dynamic> json) {` +
      entity.properties
        .map((property) => generatorFromJsonCode(property))
        .join("") +
      `\n  };`;
    // 处理 toJson
    const toJsonCode =
      `  Map<String, dynamic> toJson() {` +
      `\n    final Map<String, dynamic> data = new Map<String, dynamic>();` +
      entity.properties
        .map((property) => generatorToJsonCode(property))
        .join("") +
      `\n  };`;
    code +=
      `class ${entity.name} {` +
      `\n${propertyCode}` +
      `\n${constructorCode} ` +
      `\n${fromJsonCode}` +
      `\n\n${toJsonCode}` +
      `\n}\n\n`;
  });
  return "```dart\n" + code + "\n```";
};

function generatorFromJsonCode(property: Property) {
  const { key, type } = property;
  if (type === "object") {
    const refEntity = property.objectExtend?.reference;
    return `\n    ${key} = json['${key}'] != null ? new ${refEntity?.name}.fromJson(json['${key}']) : null;`;
  }
  if (type === "array") {
    const types = property.arrayExtend?.types || [];
    const firstChild = types[0];
    if (firstChild?.reference) {
      const referenceName = firstChild.reference.name;
      return (
        `\n    if(json['${key}'] != null) {` +
        `\n      ${key} = new List<${referenceName}>();` +
        `\n      json['${key}'].forEach((v) { ${key}.add(new ${referenceName}.fromJson(v)); });` +
        "\n    }"
      );
    }
    return `\n    ${key} = json['${key}'] != null ? json['${key}'].cast<${getDartType(
      firstChild?.type
    )}>() : null;`;
  }
  return `\n    ${key} = json['${key}'];`;
}
function generatorToJsonCode(property: Property) {
  const { key, type } = property;
  if (type === "object") {
    return (
      `\n    if(this.${key} != null) {` +
      `\n      json['${key}'] = this.${key}.toJson();` +
      "\n    }"
    );
  }
  if (type === "array") {
    const types = property.arrayExtend?.types || [];
    const firstChild = types[0];
    if (firstChild?.reference) {
      return (
        `\n    if(this.${key} != null) {` +
        `\n      json['${key}'] = this.${key}.map((v) => v.toJson()).toList();` +
        "\n    }"
      );
    }
  }
  return `\n    json['${key}'] = this.${key};`;
}

function generatorPropertyCode(property: Property) {
  const { key, type, arrayExtend } = property;
  const showKey = key;
  let showType = getType(property);
  if (type === "object") {
    showType = property.objectExtend?.reference?.name || "Object";
  }
  return `  ${showType} ${showKey}`;
}

const getDartType = (type?: AllVariableType | PropertyType[]) => {
  const typeJavaMap = {
    string: "String",
    number: "double",
    boolean: "boolean",
    object: "Object",
    array: "Array",
  };
  return typeJavaMap[type as keyof typeof typeJavaMap] || "dynamic";
};

function getType({ type, arrayExtend }: Property) {
  const javaType = getDartType(type);
  if (type === "array") {
    const firstChild = arrayExtend?.types[0];
    if (firstChild?.reference) {
      return "Array<" + firstChild.reference.name + ">";
    }
    return "Array<" + getDartType(firstChild?.type) + ">";
  }
  return javaType;
}
