import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'

import { mdPlugin } from './plugins/mdPlugin'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const cdkResolve = isBuild ? '../../dist/cdk' : '../cdk'
  const componentsResolve = isBuild ? '../../dist/components' : '../components'
  return {
    plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), mdPlugin(), vueJsxPlugin()],
    resolve: {
      alias: [
        { find: '@idux/cdk', replacement: path.resolve(__dirname, cdkResolve) },
        { find: '@idux/components', replacement: path.resolve(__dirname, componentsResolve) },
        { find: '@idux/site', replacement: path.resolve(__dirname, './src') },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    build: {
      outDir: path.resolve(__dirname, '../../dist/site'),
      emptyOutDir: true,
    },
  }
})
