interface UpdateStyleVariableConfig {
  dirs: string[]
  includes: string[]
  excludes: string[]
}

export default {
  dirs: ['components', 'pro'],
  excludes: [
    'components/_private',
    'components/config',
    'components/i18n',
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
