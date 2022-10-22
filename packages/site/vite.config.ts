import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import cdkPackage from '@idux/cdk/package.json'
import componentsPackage from '@idux/components/package.json'
import proPackage from '@idux/pro/package.json'

import { mdPlugin } from './plugins/mdPlugin'
import { themePlugin } from './plugins/themePlugin'
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
      themePlugin({
        themes: [
          { key: 'default', label: 'Default' },
          { key: 'seer', label: 'Seer' },
        ],
      }),
      viteStaticCopy({
        targets: [
          {
            src: '../../scripts/gulp/icons/assets/*.svg',
            dest: 'idux-icons',
          },
        ],
      }),
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
      __VERSION_CDK__: `'${cdkPackage.version}'`,
      __VERSION_COMPONENTS__: `'${componentsPackage.version}'`,
      __VERSION_PRO__: `'${proPackage.version}'`,
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
