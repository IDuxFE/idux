import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'

import { mdPlugin } from './plugins/mdPlugin'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const cdkResolve = isBuild ? '../cdk/dist' : '../cdk'
  const componentsResolve = isBuild ? '../components/dist' : '../components'
  return {
    plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), mdPlugin(), vueJsxPlugin()],
    resolve: {
      alias: [
        { find: '@idux/cdk', replacement: path.resolve(__dirname, cdkResolve) },
        { find: '@idux/components', replacement: path.resolve(__dirname, componentsResolve) },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
})
