import { parse, transformCode } from "json-to-any";
import { transformName } from "@/view/home/utils";
import { CodeTypeTransform } from "@/view/home/code-type/index";

export const ToJava: CodeTypeTransform = (json) => {
  const entities = parse(json);
  // 将所有实体类名统一
  entities.forEach((entity) => {
    entity.key = transformName(entity.key, { firstChatUpperCase: true });
  });
  const key = transformName;
  const strToJavaCode = (key: string, value: string) =>
    `  private ${value} ${transformName(key)};\n`;
  const type = (type: string) => {
    const map = {
      string: "String",
      number: "double",
      null: "String",
    };
    return map[type as keyof typeof map] || type;
  };
  const setGetCode = (_key: string, _type: string): string => {
    return (
      `\n  public ${type(_type)} get${key(_key, {
        firstChatUpperCase: true,
      })}(){` +
      `\n    return this.${_key}; \n  }\n` +
      `\n  public void set${key(_key, {
        firstChatUpperCase: true,
      })}(${type(_type)} ${_key}){\n` +
      `    this.${_key} = ${_key};\n  }\n`
    );
  };
  const codeResult = transformCode(entities, {
    before({ entity }) {
      return `public class ${entity.key} {\n`;
    },
    default({ property }) {
      property.key = key(property.key);
      return [
        strToJavaCode(property.key, type(property.type)),
        setGetCode(property.key, property.type),
      ];
    },
    object({ property }) {
      return [
        strToJavaCode(
          property.key,
          transformName(property.entity.key, {
            firstChatUpperCase: true,
          })
        ),
        setGetCode(property.key, property.entity.key),
      ];
    },
    array({ property }) {
      const childProperty = property.childProperty;
      if (childProperty.type === "object") {
        return strToJavaCode(
          property.key,
          `Array<${(childProperty as any).entity.key}>`
        );
      }
      if (childProperty.type === "null") {
        return strToJavaCode(property.key, `Array<${type("null")}>`);
      }
      return [
        strToJavaCode(property.key, `Array<${type(childProperty.type)}>`),
        setGetCode(property.key, `Array<${type(childProperty.type)}>`),
      ];
    },
    after() {
      return "}\n\n";
    },
  });
  return "```java\n" + codeResult + "\n```";
};
