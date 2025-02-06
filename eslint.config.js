import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    ignores: ['node_modules', '**/dist/**', 'scripts', '**/*.mjs', '**/coverage/**'],
  },
  {
    files: ['**/*.js|.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    rules: { '@typescript-eslint/array-type': ['error', { default: 'generic' }] },
  },
);
