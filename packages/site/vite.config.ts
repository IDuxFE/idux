import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'

import { mdPlugin } from './plugins/mdPlugin'

export default defineConfig({
  plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), mdPlugin(), vueJsxPlugin()],
  resolve: {
    alias: [
      {
        find: '@idux/cdk',
        replacement: path.resolve(__dirname, '../cdk'),
      },
      {
        find: '@idux/components',
        replacement: path.resolve(__dirname, '../components'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
