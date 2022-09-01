import type { Pattern } from 'fast-glob'

export interface UpdateStyleVariableConfig {
  dirs: string[]
  targetDocs: string
  sourcePattern: Pattern
  includes?: string[]
  excludes?: string[]
}

export default {
  dirs: ['components', 'pro'],
  targetDocs: 'docs/Theme.zh.md',
  sourcePattern: 'style/themes/*.variable.less',
  excludes: [
    'components/_private',
    'components/config',
    'components/locales',
    'components/style',
    'components/utils',
    'components/version',
    'components/node_modules',
    'pro/config',
    'pro/locales',
    'pro/node_modules',
    'pro/style',
    'pro/version',
  ],
} as UpdateStyleVariableConfig
