module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-undef": "off",
  },
};
