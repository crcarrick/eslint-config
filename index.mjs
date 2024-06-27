// @ts-check

/**
 * @typedef {import('eslint').Linter.FlatConfig} FlatConfig
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

import { FlatCompat } from '@eslint/eslintrc'

import jslint from '@eslint/js'
import tslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import imprtPlugin from 'eslint-plugin-import-x'

const compat = new FlatCompat()

/** @type {FlatConfig[]} */
const plugins = [
  ...compat.config(reactPlugin.configs.recommended),
  // @ts-ignore
  ...compat.config(hooksPlugin.configs.recommended),
  ...compat.config(imprtPlugin.configs.recommended),
  ...compat.config(imprtPlugin.configs.typescript),
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

/** @type {RulesRecord} */
const importRules = {
  'import-x/order': [
    'error',
    {
      alphabetize: { order: 'asc' },
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      'newlines-between': 'always',
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
      ...importRules,
    },
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
  ...tslint.configs.recommendedTypeChecked,
  ...plugins,
  ...configs,
)
