import { parse, transformCode } from "json-to-any";
import { transformName } from "@/view/home/utils";
import { CodeTypeTransform } from "@/view/home/code-type/index";

export const ToTypescript: CodeTypeTransform = (json) => {
  const entities = parse(json);
  // 将所有实体类名统一
  entities.forEach((entity) => {
    entity.key = transformName(entity.key, { firstChatUpperCase: true });
  });
  const strToTsCode = (key: string, value: string) =>
    `  ${transformName(key)}${value};\n`;
  const code = transformCode(entities, {
    before({ entity }) {
      return `interface ${entity.key} {\n`;
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
      if (childProperty.type === "object") {
        return strToTsCode(property.key, `: ${property.childProperty.key}[]`);
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
