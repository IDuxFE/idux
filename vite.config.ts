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
        return path
      },
    },
  ],
}

export default config
