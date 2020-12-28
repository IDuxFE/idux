import { UserConfig } from 'vite'

const config: UserConfig = {
  entry: './site/docs/index.html', // not work
  base: './site/docs/', // not work
  resolvers: [
    {
      alias(path: string): string {
        if (path.startsWith('@idux')) {
          return path.replace('@idux', '/packages')
        }
        if (path.startsWith('@components')) {
          return path.replace('@components', '/packages/components')
        }
        if (path.startsWith('@cdk')) {
          return path.replace('@cdk', '/packages/cdk')
        }
        if (path.startsWith('@pro')) {
          return path.replace('@pro', '/packages/pro')
        }
        return path
      },
    },
  ],
  cssPreprocessOptions: {
    less: {
      javascriptEnabled: true,
    },
  },
}

export default config
