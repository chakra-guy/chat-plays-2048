module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "react-app", "prettier", "prettier/react"],
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
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react-hooks/rules-of-hooks": "error",
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "react/jsx-props-no-spreading": "off",
        "react/jsx-filename-extension": "off",
      },
    },
  ],
}
