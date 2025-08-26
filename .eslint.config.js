// eslint.config.js
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import stylistic from '@stylistic/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['**/dist/**', '**/node_modules/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: true
      }
    },
    plugins: {
      '@typescript-eslint': ts,
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }
      ],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single']
    }
  }
];
