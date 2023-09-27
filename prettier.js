module.exports = {
  // 使用 2 个空格缩进
  tabWidth: 2,

  // 不使用缩进符，而使用空格
  useTabs: false,

  // 行尾需要有分号
  semi: true,

  // 使用单引号
  singleQuote: true,

  // 对象的 key 仅在必要时用引号
  quoteProps: "as-needed",

  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,

  // 末尾需要有逗号
  trailingComma: "es5",

  // 大括号内的首尾需要空格
  bracketSpacing: true,

  // jsx 标签的反尖括号需要换行
  bracketSameLine: false,

  //多属性html标签的‘>’折行放置
  jsxBracketSameLine: false,

  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: "always",

  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,

  // 折行标准
  proseWrap: "never",

  // 所有的空格换行情况都保留
  htmlWhitespaceSensitivity: "strict",

  // 换行符使用 \n
  endOfLine: "lf",
};
