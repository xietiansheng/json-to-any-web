const firstChatToUpperCase = (val: string) =>
  (val && val[0].toUpperCase() + val.slice(1, val.length)) || "";

export const formatKey = (
  key: string
): { upKey: string; lowKey: string; originKey: string } => {
  return {
    upKey: firstChatToUpperCase(key),
    lowKey: key,
    originKey: key,
  };
};

export function getCodeResult(name: string, code: string) {
  code = code.replaceAll("'", '"');
  const funCode = `
      function toUpper(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
      } 
      function toHump(name, separators) {
        if (!Array.isArray(separators)) {
          separators = [separators];
        }
        let regexString = separators.map((sep) => sep.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&')).join('|');
        let regex = new RegExp(\`(\${regexString})(\\\\w)\`, 'g');
        return name.replace(regex, function (match, separator, letter) {
          return letter.toUpperCase();
        });
      }
      const funNameArr = ["toUpper", "toHump"];
      const funArr = [toUpper, toHump];
      return new Function("name",...funNameArr, "return " + '${code}')('${name}',...funArr)
      `;
  return new Function("name", funCode)(name);
}
