import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.{js,jsx}'],
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
        },
      ],
      quotes: ['error', 'single'],
    },
  },
  pluginReact.configs.flat.recommended,
]);
