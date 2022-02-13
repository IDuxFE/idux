import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { mdPlugin } from './plugins/mdPlugin'
import { transformIndexPlugin } from './plugins/transformIndexPlugin'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [
      vuePlugin({ include: [/\.vue$/, /\.md$/] }),
      vueJsxPlugin({ enableObjectSlots: false }),
      mdPlugin(),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
      }),
      transformIndexPlugin(),
    ],
    resolve: {
      alias: [
        { find: '@idux/cdk', replacement: resolve(__dirname, '../cdk') },
        { find: '@idux/components', replacement: resolve(__dirname, '../components') },
        { find: '@idux/pro', replacement: resolve(__dirname, '../pro') },
        { find: '@idux/site', replacement: resolve(__dirname, './src') },
      ],
    },
    define: {
      __DEV__: !isBuild,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import '@idux/components/style/variable/index.less';`,
        },
      },
    },
    build: {
      outDir: resolve(__dirname, '../../dist/site'),
      emptyOutDir: true,
    },
  }
})
