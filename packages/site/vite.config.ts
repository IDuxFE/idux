import path from 'path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { IduxResolver } from 'unplugin-vue-components/resolvers'

import { mdPlugin } from './plugins/mdPlugin'
import { transformIndexPlugin } from './plugins/transformIndexPlugin'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const cdkResolve = isBuild ? '../../dist/cdk' : '../cdk'
  const componentsResolve = isBuild ? '../../dist/components' : '../components'
  return {
    plugins: [
      vuePlugin({ include: [/\.vue$/, /\.md$/] }),
      vueJsxPlugin({ enableObjectSlots: false }),
      mdPlugin(),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
        resolvers: [
          name => {
            // where `name` is always CapitalCase
            if (name.startsWith('IxVirtualScroll')) {
              const path = `@idux/cdk/scroll`
              const sideEffects = undefined
              return { importName: name, path, sideEffects }
            }
          },
          IduxResolver({ importStyle: 'less' }),
        ],
      }),
      transformIndexPlugin(),
    ],
    resolve: {
      alias: [
        { find: '@idux/cdk', replacement: path.resolve(__dirname, cdkResolve) },
        { find: '@idux/components', replacement: path.resolve(__dirname, componentsResolve) },
        { find: '@idux/site', replacement: path.resolve(__dirname, './src') },
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
      outDir: path.resolve(__dirname, '../../dist/site'),
      emptyOutDir: true,
    },
  }
})
