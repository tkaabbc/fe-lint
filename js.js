// Fix eslint shareable config (https://github.com/eslint/eslint/issues/3458)
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  env: {
    browser: true,
  },

  // extends可以是npm包名（eslint-config前缀可以省略），也可以是npm包的路径
  extends: [
    "eslint-config-airbnb-base",

    // 关闭所有可能与prettier冲突的规则；一定要是最后一个，才能确保覆盖
    "eslint-config-prettier",
  ],

  rules: {
    // 禁用 针对class组件，如果在实例方法中没有使用this，那么ESLint推荐你写成static方法
    "class-methods-use-this": "off",

    // 关闭只有一个导出时要求默认导出
    "import/prefer-default-export": "off",

    // 很多时候函数的形参和传参是同名的
    "no-shadow": "off",

    // 控制import时是否加文件拓展名
    "import/extensions": [
      "error",
      {
        tsx: "never",
        ts: "never",
        jsx: "never",
        js: "never",
        json: "always",
      },
    ],

    // 禁止未运行的表达式
    "no-unused-expressions": [
      "error",
      {
        // 允许在表达式中使用逻辑短路求值
        allowShortCircuit: true,

        // 允许在表达式中使用三元表达式
        allowTernary: true,
      },
    ],

    // 禁止变量命名前带下划线
    "no-underscore-dangle": "off",

    // 控制import导入顺序
    // 注意 import 'xxx' 这种导入方式不在此插件的校验范围
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
          "object",
          "unknown",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "*.@(css|less|scss|sass)",

            // 配置参考 https://github.com/isaacs/minimatch
            patternOptions: { matchBase: true },
            group: "unknown",
            position: "after",
          },
        ],
      },
    ],

    // TODO 下面这些规则在一些场景下感觉不是太合理，所以先off关闭了等待确认是否需要
    // ====== 确认是否需要 start ======
    // 禁止函数在不同分支返回不同类型的值
    "consistent-return": "off",

    // 只强制对象解构,不强制数组解构 (强制数组解构的话这么写const a = arr[3]就会报错)
    "prefer-destructuring": [
      "error",
      {
        array: false,
        object: true,
      },
    ],

    // 用else if能更清晰表示相关关系
    "no-else-return": "off",

    // 有些场景在else中写if感觉也能更清晰地把逻辑表述清楚
    "no-lonely-if": "off",

    "no-use-before-define": "off",

    // 禁止使用for in/of
    "no-restricted-syntax": "off",

    // 函数必须有名字
    "func-names ": "off",

    // 默认禁止使用'default'作为导出名
    "no-restricted-exports": "off",

    // switch 必须有default
    "default-case": "off",

    "no-plusplus": "off",

    // 在一些场景下默认参数还是需要放在非最后一个的
    "default-param-last": "off",

    // 禁止函数在不同分支返回不同类型的值
    "consistent-return": "off",

    // 跟Redux中的HOC写法有冲突，先关闭
    // https://stackoverflow.com/questions/44437203/how-do-i-resolve-eslint-import-no-named-as-default
    "import/no-named-as-default": "off",
    // ====== 确认是否需要 end ======
  },
};
