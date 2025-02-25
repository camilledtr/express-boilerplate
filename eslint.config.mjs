import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import jestPlugin from "eslint-plugin-jest"

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },

    settings: {
      "import/resolver": {
        node: {
          paths: ["src", "./"],
          extensions: [".js", ".ts", ".mjs", ".cjs"],
        },
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      jest: jestPlugin,
    },

    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "no-console": "off",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
  {
    files: ["**/*.test.{js,ts,mjs,cjs}", "**/*.spec.{js,ts,mjs,cjs}"],
    languageOptions: {
      globals: globals.jest,
    },
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/scripts/*/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
];