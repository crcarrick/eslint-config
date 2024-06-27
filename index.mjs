// @ts-check

import { FlatCompat } from '@eslint/eslintrc'

import jslint from '@eslint/js'
import tslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import hooksPlugin from 'eslint-plugin-react-hooks'
import imprtPlugin from 'eslint-plugin-import-x'

const compat = new FlatCompat()

/** @type {import('eslint').Linter.FlatConfig[]} */
const plugins = [
  ...compat.config(reactPlugin.configs.recommended),
  // @ts-ignore
  ...compat.config(hooksPlugin.configs.recommended),
  ...compat.config(imprtPlugin.configs.recommended),
  ...compat.config(imprtPlugin.configs.typescript),
]

/** @type {import('eslint').Linter.RulesRecord} */
const jsRules = {
  semi: 'off',
  'no-unused-vars': 'off',
}

/** @type {import('eslint').Linter.RulesRecord}*/
const tsRules = {
  '@typescript-eslint/ban-types': [
    'error',
    {
      types: { '{}': false },
      extendDefaults: true,
    },
  ],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/semi': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
}

/** @type {import('eslint').Linter.RulesRecord}*/
const reactRules = {
  'react/react-in-jsx-scope': 'off',
  'react/jsx-uses-react': 'off',
}

/** @type {import('eslint').Linter.RulesRecord} */
const importRules = {
  'import-x/order': [
    'error',
    {
      'newlines-between': 'always',
      alphabetize: { order: 'asc' },
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
    },
  ],
}

/** @type {import('eslint').Linter.FlatConfig[]}*/
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
