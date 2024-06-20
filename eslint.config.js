const tsPlugin = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const unusedImportsPlugin = require('eslint-plugin-unused-imports');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  {
    ignores: ['node_modules/**', 'build/**', 'coverage/**'],
  },
  {
    files: ['**/*.{ts}'],
    plugins: {
      '@typescript-eslint': tsPlugin,
      unusedImports: unusedImportsPlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-imports': 'error',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
    },
  },
];
