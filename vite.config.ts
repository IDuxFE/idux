import { UserConfig } from 'vite'

const config: UserConfig = {
  entry: '/site/docs/index.html',
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
