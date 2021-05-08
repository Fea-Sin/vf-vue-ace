module.exports = {
  trailingComma: "es5",
  tabWidth: 2,

  // 总是使用单引号
  // singleQuote: true,

  // 配置标签换行格式
  // 与 htmlWhitespaceSensitivity 一起配置才能生效
  // htmlWhitespaceSensitivity: "css" | "strict" | "ignore"
  jsxBracketSameLine: true,
  htmlWhitespaceSensitivity: "ignore",
  requirePragma: false,

  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      options: {
        singleQuote: true,
      },
    },
  ],
};
