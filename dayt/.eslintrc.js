module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: {
      impliedStrict: false
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier-vue/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:vue/vue3-recommended"
  ],
  rules: {
    semi: [2, "always"],
    quotes: [2, "double"],
    "no-console": 0,
    "vue/attribute-hyphenation": 0,
    "vue/html-self-closing": 0,
    "vue/singleline-html-element-content-newline": [
      2,
      {
        ignores: ["h1"]
      }
    ]
  }
};
