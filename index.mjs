// @ts-check

/**
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 * @typedef {import('eslint').Linter.RuleEntry} RuleEntry
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

import { FlatCompat } from '@eslint/eslintrc'

import jslint from '@eslint/js'
import tslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import perfectPlugin from 'eslint-plugin-perfectionist'

const compat = new FlatCompat()

/** @type {FlatConfig[]} */
const plugins = [
  perfectPlugin,
  ...compat.config(reactPlugin.configs.recommended),
  // @ts-ignore
  ...compat.config(hooksPlugin.configs.recommended),
]

/** @type {RulesRecord} */
const jsRules = {
  semi: 'off',
  'no-unused-vars': 'off',
}

/** @type {RulesRecord}*/
const tsRules = {
  '@typescript-eslint/ban-types': [
    'error',
    {
      extendDefaults: true,
      types: { '{}': false },
    },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/semi': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
    },
  ],
}

/** @type {RulesRecord}*/
const reactRules = {
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
}

/** @type {RuleEntry} */
const lineLength = ['error', { type: 'line-length', order: 'desc' }]
/** @type {RuleEntry} */
const alphabetize = ['error', { type: 'alphabetize', order: 'asc' }]

/** @type {RulesRecord} */
const perfectRules = {
  'perfectionist/sort-maps': lineLength,
  'perfectionist/sort-enums': lineLength,
  'perfectionist/sort-classes': lineLength,
  'perfectionist/sort-exports': alphabetize,
  'perfectionist/sort-objects': lineLength,
  'perfectionist/sort-jsx-props': lineLength,
  'perfectionist/sort-interfaces': lineLength,
  'perfectionist/sort-union-types': lineLength,
  'perfectionist/sort-object-types': lineLength,
  'perfectionist/sort-named-exports': alphabetize,
  'perfectionist/sort-named-imports': alphabetize,
  'perfectionist/sort-array-includes': lineLength,
  'perfectionist/sort-intersection-types': lineLength,
  'perfectionist/sort-imports': [
    'error',
    {
      // defaults to alphabetical asc
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
    },
  ],
}

/** @type {FlatConfig[]}*/
const configs = [
  {
    rules: {
      ...jsRules,
      ...tsRules,
      ...reactRules,
      ...perfectRules,
    },
    // plugins: { perfectionist: perfectPlugin },
    settings: {
      react: { version: 'detect' },
      'import/parsers': {
        '@typescript/eslint-parser': ['.ts', '.tsx'],
      },
    },
  },
]

export default tslint.config(
  jslint.configs.recommended,
  ...tslint.configs.strictTypeChecked,
  ...plugins,
  ...configs,
)
