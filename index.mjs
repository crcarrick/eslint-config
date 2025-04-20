// @ts-check

/**
 * @typedef {import('eslint').Linter.Config} Config
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

import jslint from '@eslint/js'
import tslint from 'typescript-eslint'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import perfectPlugin from 'eslint-plugin-perfectionist'

/** @type {Config[]} */
const plugins = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  hooksPlugin.configs['recommended-latest'],
  perfectPlugin.configs['recommended-alphabetical'],
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
  '@typescript-eslint/semi': 'off',
}

/** @type {RulesRecord}*/
const reactRules = {
  'react/jsx-uses-react': 'off',
  'react/react-in-jsx-scope': 'off',
}

/** @type {RulesRecord} */
const perfectRules = {
  'perfectionist/sort-maps': ['error', { type: 'line-length' }],
  'perfectionist/sort-enums': ['error', { type: 'line-length' }],
  'perfectionist/sort-classes': ['error', { type: 'line-length' }],
  'perfectionist/sort-objects': ['error', { type: 'line-length' }],
  'perfectionist/sort-jsx-props': ['error', { type: 'line-length' }],
  'perfectionist/sort-interfaces': ['error', { type: 'line-length' }],
  'perfectionist/sort-union-types': ['error', { type: 'line-length' }],
  'perfectionist/sort-object-types': ['error', { type: 'line-length' }],
  'perfectionist/sort-array-includes': ['error', { type: 'line-length' }],
  'perfectionist/sort-intersection-types': ['error', { type: 'line-length' }],
  'perfectionist/sort-imports': [
    'error',
    { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'] },
  ],
}

/** @type {Config[]}*/
const configs = [
  {
    rules: {
      ...jsRules,
      ...tsRules,
      ...reactRules,
      ...perfectRules,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      perfectionist: perfectPlugin,
      // @ts-expect-error Plugin shape is valid, TS just doesn't like the generic shape
      '@typescript-eslint': tsPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]

export default tslint.config(
  jslint.configs.recommended,
  ...tslint.configs.strictTypeChecked,
  ...plugins,
  ...configs,
)
