module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["standard"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-uses-vars": 2,
    "react/jsx-uses-react": 2,
    semi: [2, "always"],
    quotes: [0, "double"],
    "comma-dangle": [2, "always-multiline"],
    "spaced-comment": [
      "error",
      "always",
      {
        line: {
          markers: ["/"],
          exceptions: ["-", "+"],
        },
        block: {
          markers: ["!"],
          exceptions: ["*"],
          balanced: true,
        },
      },
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "always",
        asyncArrow: "always",
      },
    ],
  },
  parser: "babel-eslint",
};
