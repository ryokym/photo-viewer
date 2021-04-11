module.exports = {
  root: true,
  plugins: ["prettier", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  env: { browser: true, node: true, es6: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "no-dupe-class-members": "off",
    "no-prototype-builtins": "warn",
    "require-await": "warn"
  },
  overrides: [
    {
      files: ["src/**/*.spec.ts"],
      env: {
        jest: true
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["src/**/*.{ts,vue}"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      },
      extends: ["plugin:vue/recommended", "prettier/vue"],
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "no-console": "off",
        "no-prototype-builtins": "off",
        "no-unreachable": "error",
        "no-unused-vars": "off",
        "vue/no-unused-vars": "off",
        "vue/valid-v-slot": "off",
        "vue/require-prop-types": "off",
        "vue/no-side-effects-in-computed-properties": "off"
      }
    }
  ]
};
