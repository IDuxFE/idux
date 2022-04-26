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
  targetDocs: 'docs/Index.zh.md',
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
    'pro/node_modules',
    'pro/style',
    'pro/version',
  ],
} as UpdateStyleVariableConfig
