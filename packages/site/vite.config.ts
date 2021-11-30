import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { IduxResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

import { mdPlugin } from './plugins/mdPlugin'
import { transformIndexPlugin } from './plugins/transformIndexPlugin'

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'
  const cdkResolve = isBuild ? '../../dist/cdk' : '../cdk'
  const componentsResolve = isBuild ? '../../dist/components' : '../components'
  const proResolve = isBuild ? '../../dist/pro' : '../pro'

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
            if (name === 'CdkPortal') {
              const path = `@idux/cdk/portal`
              const sideEffects = undefined
              return { importName: name, path, sideEffects }
            } else if (name === 'CdkVirtualScroll') {
              const path = `@idux/cdk/scroll`
              const sideEffects = undefined
              return { importName: name, path, sideEffects }
            } else if (name === 'IxTab') {
              const path = `@idux/components/tabs`
              const sideEffects = undefined
              return { importName: name, path, sideEffects }
            } else if (name === 'IxLayoutPro') {
              const path = `@idux/pro/layout`
              const sideEffects = undefined
              return { importName: name, path, sideEffects }
            }
          },
          IduxResolver(),
        ],
      }),
      transformIndexPlugin(),
    ],
    resolve: {
      alias: [
        { find: '@idux/cdk', replacement: resolve(__dirname, cdkResolve) },
        { find: '@idux/components', replacement: resolve(__dirname, componentsResolve) },
        { find: '@idux/pro', replacement: resolve(__dirname, proResolve) },
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
