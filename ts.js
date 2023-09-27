module.exports = {
  extends: [require.resolve("./js.js")],
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      extends: [
        // Typescript 推荐配置，包含 ts parser/ts plugin
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        // 允许使用ts-ignore
        "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": false }],

        // 是否禁止any
        "@typescript-eslint/no-explicit-any": "off",

        "@typescript-eslint/no-var-requires": "off",

        // 因为TS已经提供了这些校验, 所以关闭
        // https://typescript-eslint.io/docs/linting/troubleshooting/#eslint-plugin-import
        "import/named": "off",
        "import/namespace": "off",
        "import/default": "off",
        "import/no-named-as-default-member": "off",
      },
    },
  ],
};
