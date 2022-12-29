/**
 * 属性名，实体名的统一处理
 * @param name
 * @param options
 * @param options.firstChatUpperCase 首字母是否需要大写
 */
export const transformName = (
  name: string,
  options?: {
    firstChatUpperCase: boolean;
  }
): string => {
  if (!name) {
    return name;
  }
  if (name.includes("_")) {
    name = transformSymbolName(name, "_");
  }
  if (name.includes(".")) {
    name = transformSymbolName(name, ".");
  }
  return options?.firstChatUpperCase ? firstChatToUpperCase(name) : name;
};
const firstChatToUpperCase = (val: string) =>
  (val && val[0].toUpperCase() + val.slice(1, val.length)) || "";
/**
 *  特殊拼接符号处理
 *  order_id ==> orderId
 */
const transformSymbolName = (name: string, symbolStr: string) => {
  return name.split(symbolStr).reduce((pre, item, index) => {
    let res = item;
    if (index !== 0) {
      res = firstChatToUpperCase(item);
    }
    return pre + res;
  }, "");
};

export const formatKey = (
  key: string
): { upKey: string; lowKey: string; originKey: string } => {
  const _key = transformName(key);
  return {
    upKey: firstChatToUpperCase(_key),
    lowKey: _key,
    originKey: key,
  };
};
