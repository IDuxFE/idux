import path from 'path'
import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import ViteComponents, { IduxResolver } from 'vite-plugin-components'

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
      ViteComponents({
        customLoaderMatcher: id => id.endsWith('.md'),
        globalComponentsDeclaration: true,
        customComponentResolvers: [IduxResolver({ importStyle: 'less' })],
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
