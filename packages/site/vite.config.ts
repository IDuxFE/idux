import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line import/no-unresolved
import { IduxResolver } from 'unplugin-vue-components/resolvers'
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import cdkPackage from '@idux/cdk/package.json'
import componentsPackage from '@idux/components/package.json'
import proPackage from '@idux/pro/package.json'

import { mdPlugin } from './plugins/mdPlugin'
import { themePlugin } from './plugins/themePlugin'
import { transformIndexPlugin } from './plugins/transformIndexPlugin'

const componentPath: Record<string, string> = {
  CdkClickOutside: '@idux/cdk/click-outside',
  CdkDraggable: '@idux/cdk/drag-drop',
  CdkResizable: '@idux/cdk/resize',
  CdkResizableHandle: '@idux/cdk/resize',
  CdkResizeObserver: '@idux/cdk/resize',
  IxLoadingBar: '@idux/components/loading-bar',
  IxLoadingBarProvider: '@idux/components/loading-bar',
}

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const baseUrl = mode === 'pre-version' ? `/version/${cdkPackage.version.slice(0, -1)}x/` : '/'

  return {
    plugins: [
      vuePlugin({ include: [/\.vue$/, /\.md$/] }),
      vueJsxPlugin({ enableObjectSlots: false }),
      mdPlugin(),
      Components({
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: true,
        resolvers: [
          (name: string) => {
            const path = componentPath[name]
            return path ? { name, from: path } : undefined
          },
          IduxResolver(),
        ],
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
      chunkSplitPlugin(),
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
      __BASE_URL__: `'${baseUrl}'`,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import '@idux/components/style/variable/index.less';`,
        },
      },
    },
    base: baseUrl,
    build: {
      outDir: resolve(__dirname, '../../dist/site'),
      emptyOutDir: true,
      target: ['chrome79', 'edge79', 'firefox72', 'safari13'],
    },
  }
})
