module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaVersion: "2015",
  },
  rules: {
    "@typescript-eslint/no-unnecessary-type-assertion": 0,
    "@typescript-eslint/no-unsafe-argument": 0,
    "@typescript-eslint/no-unsafe-assignment": 0,
    "@typescript-eslint/restrict-template-expressions": 0,
    "@typescript-eslint/no-unsafe-member-access": 0,
    "@typescript-eslint/require-await": 0,
    "@typescript-eslint/no-floating-promises": 0,
    "@typescript-eslint/comma-dangle": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    "prettier/prettier": 0,
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
        functions: false,
        classes: false,
        variables: false,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/member-delimiter-style": "off",
    "@typescript-eslint/quotes": "off",
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
};
