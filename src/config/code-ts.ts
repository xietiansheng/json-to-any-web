import { parse, transformCode } from "json-to-any";
import { CodeTypeTransform } from "@/types/code-type";
import { formatKey, transformName } from "@/utils/code-util";

export const ToTypescript: CodeTypeTransform = (json) => {
  const entities = parse(json);
  // 将所有实体类名统一
  entities.forEach((entity) => {
    const { upKey } = formatKey(entity.key);
    entity.key = upKey;
  });
  const strToTsCode = (key: string, value: string) =>
    `  ${transformName(key)}${value};\n`;
  const code = transformCode(entities, {
    before({ entity }) {
      return `export interface ${entity.key} {\n`;
    },
    default({ property }) {
      // key: value;
      return strToTsCode(property.key, `: ${property?.type}`);
    },
    object({ property }) {
      // key: Model;
      return strToTsCode(property.key, `: ${property.entity.key}`);
    },
    array({ property }) {
      const childProperty = property.childProperty;
      const { upKey } = formatKey(childProperty.key);
      if (childProperty.type === "object") {
        return strToTsCode(property.key, `: ${upKey}[]`);
      }
      if (childProperty.type === "null") {
        return strToTsCode(property.key, `?: any[]`);
      }
      return strToTsCode(property.key, `: ${childProperty.type}[]`);
    },
    null({ property }) {
      // key?: any;
      return strToTsCode(property.key, `?: any`);
    },
    after() {
      return "}\n\n";
    },
  });
  return "```ts\n" + code + "\n```";
};
