import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import importX from 'eslint-plugin-import-x';
import { configs as packageJsonConfigs } from 'eslint-plugin-package-json';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const styleRules = {
  'prettier/prettier': 'error',
  'import-x/order': [
    'warn',
    {
      groups: [['builtin', 'external', 'internal'], 'type'],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
};

export default defineConfig([
  prettierConfig,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/*.tsbuildinfo',
      'eslint.config.mjs',
      '**/*.mjs',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.spec.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    settings: {
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],
      'import-x/prefer-default-export': 'off',
      'import-x/no-duplicates': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-unresolved': 'off',
      ...styleRules,
    },
  },
  {
    files: ['**/*.spec.ts', '**/test-fixtures/**/*.ts'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: styleRules,
  },
  {
    files: ['**/*.cjs', 'prettier.config.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
  // @eslint-react/eslint-plugin — add a scoped block for apps/web when the app has source
  {
    ...packageJsonConfigs.recommended,
    files: ['**/package.json'],
    rules: {
      'package-json/restrict-dependency-ranges': [
        'error',
        {
          forDependencyTypes: ['devDependencies', 'dependencies'],
          // tilde (~x.y.z) for registry deps; pin also keeps workspace:*
          rangeType: ['tilde', 'pin'],
        },
      ],
    },
  },
]);
