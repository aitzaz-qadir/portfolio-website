import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: globals.browser },
  },
  // Config files run in Node
  {
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  { settings: { react: { version: 'detect' } } },
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  // Last, so it can switch off style rules that conflict with Prettier
  prettierRecommended,
  { rules: { 'prettier/prettier': 'warn' } },
]);
