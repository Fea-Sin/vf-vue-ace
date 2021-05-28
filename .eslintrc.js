module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "@typescript-eslint/no-var-requires": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};