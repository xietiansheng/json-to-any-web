import { parse, transformCode } from "json-to-any";
import { formatKey, transformName } from "@/view/home/utils";
import { CodeTypeTransform } from "@/view/home/code-type/index";

export const ToDart: CodeTypeTransform = (json) => {
  const entities = parse(json);
  // 将所有实体类名统一
  const key = transformName;
  const strToDartPropCode = (key: string, value: string) =>
    `\t${value} ${transformName(key)};\n`;
  const type = (type: string) => {
    const map = {
      string: "String",
      number: "int",
      null: "dynamic",
      boolean: "bool",
    };
    return map[type as keyof typeof map] || type;
  };
  const codeResult = transformCode(entities, {
    before({ entity }) {
      const { upKey } = formatKey(entity.key);
      return `class ${upKey} {\n`;
    },
    childBefore({ entity }) {
      const jsonType = "Map<String, dynamic>";
      const dataCode = `\tfinal ${jsonType} json = new ${jsonType}();`;
      return [
        "",
        `\n\t${key(entity.key, { firstChatUpperCase: true })}({\n`,
        `\n\t${key(entity.key, {
          firstChatUpperCase: true,
        })}.fromJson(${jsonType} json) {\n`,
        `\n\t${jsonType} toJson() {\n    ${dataCode}\n`,
      ];
    },
    childAfter() {
      return ["", "\t});\n", "\t};\n", "\t\treturn json;\n\t};\n"];
    },
    default({ property }) {
      const pKey = key(property.key);
      return [
        strToDartPropCode(pKey, type(property.type)),
        `\t\tthis.${pKey},\n`,
        `\t\t${pKey} = json['${property.key}'];\n`,
        `\t\tjson['${pKey}'] = this.${pKey};\n`,
      ];
    },
    object({ property }) {
      const { upKey, lowKey, originKey } = formatKey(property.entity.key);
      const objFromJsonCode = `\t\t${lowKey} = json['${originKey}'] != null ? new ${upKey}.fromJson(json['${originKey}']) : null;\n`;
      const objToJsonCode = `\t\tif (this.${originKey} != null) {\n\t\t\tjson['${lowKey}'] = this.${lowKey}.toJson();\n\t\t}\n`;
      return [
        strToDartPropCode(lowKey, upKey),
        `\t\tthis.${lowKey},\n`,
        objFromJsonCode,
        objToJsonCode,
      ];
    },
    array({ property }) {
      const { upKey, lowKey, originKey } = formatKey(
        property.childProperty.key
      );
      const constructorCode = `\t\tthis.${lowKey},\n`;
      const childProperty = property.childProperty;
      if (childProperty.type === "object") {
        return [
          strToDartPropCode(property.key, `List<${upKey}>`),
          constructorCode,
          `\t\tif (json['${originKey}'] != null) {\n\t\t\t${lowKey} = new List<${upKey}>();\n\t\t\tjson['${originKey}'].forEach((v) { ${lowKey}.add(new ${upKey}.fromJson(v)); });\n\t\t}\n`,
          `\t\tif (this.${lowKey} != null) {\n\t\t\tjson['${lowKey}'] = this.${lowKey}.map((v) => v.toJson()).toList();\n\t\t}\n`,
        ];
      }
      if (childProperty.type === "null") {
        return [
          strToDartPropCode(property.key, `List<${type("null")}>`),
          constructorCode,
          `\t\t${lowKey} = json['${originKey}'];\n`,
          `\t\tjson['${lowKey}'] = this.${lowKey};\n`,
        ];
      }
      return [
        strToDartPropCode(property.key, `List<${type(childProperty.type)}>`),
        constructorCode,
        `\t\t${property.key} = json['${lowKey}'].cast<${type(
          childProperty.type
        )}>();\n`,
        `\t\tjson['${lowKey}'] = this.${lowKey};\n`,
      ];
    },
    after() {
      return "}\n\n";
    },
  });
  return "```dart\n" + codeResult + "\n```";
};
