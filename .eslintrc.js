const { resolve } = require('path')

const prettierConfig = require('./.prettierrc.js')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  plugins: ['jsdoc', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@idux': resolve(__dirname, './packages'),
          '@tests': resolve(__dirname, './tests'),
        },
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.vue', '.md'],
        packages: ['packages/*'],
      },
    },
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['header'],
      rules: {
        'header/header': [
          2,
          'block',
          [
            '*',
            ' * @license',
            ' *',
            ' * Use of this source code is governed by an MIT-style license that can be',
            ' * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE',
            ' ',
          ],
          2,
        ],
      },
    },
    {
      files: [
        'scripts/**/*.ts',
        'tests/**/*.ts',
        'typings/**/*.ts',
        'packages/site/**/*.ts',
        '**/demo/*.ts',
        '**/style/*.ts',
        '**/style/**/*.ts',
        '*.spec.ts',
      ],
      rules: {
        'header/header': 'off',
      },
    },
    {
      files: ['**/style/*.ts', '**/style/**/*.ts'],
      rules: {
        'import/no-unassigned-import': 'off',
      },
    },
  ],
  rules: {
    // common
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': ['error', 'as-needed'],
    // note you must disable the base rule as it can report incorrect errors
    // use '@typescript-eslint/brace-style': ['error', '1tbs']
    'brace-style': 'off',
    curly: ['error', 'all'],
    camelcase: ['error', { properties: 'never' }],
    'comma-style': ['error', 'last'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'prefer-const': ['error', { destructuring: 'all' }],
    semi: ['error', 'never'],
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],

    // prettier
    'prettier/prettier': ['error', prettierConfig],

    // ts
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // vue
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'error',

    'import/no-duplicates': 'error',
    'import/no-unused-modules': 'error',
    'import/no-unassigned-import': 'error',
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always',
        groups: ['type', 'builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: '{vue,@vue/**}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{@juggle/**,@popperjs/**,lodash-es}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@idux/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
  },
  ignorePatterns: [
    'dist',
    'packages/site/components.d.ts',
    'packages/site/plugins/**/*.ts',
    'packages/site/src/router.ts',
    'packages/site/src/sideNav.ts',
    'packages/site/src/components/global/themeConfig.ts',
  ],
}
