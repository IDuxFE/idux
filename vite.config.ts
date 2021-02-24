import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import path from 'path'

import { mdPlugin } from './scripts/vite/mdPlugin'

export default defineConfig({
  // hmr not work
  // root: './site/docs',
  plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), mdPlugin(), vueJsxPlugin()],
  resolve: {
    alias: [
      {
        find: '@idux',
        replacement: path.resolve(__dirname, 'packages'),
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
