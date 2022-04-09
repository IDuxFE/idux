/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  root: resolve(__dirname, './packages'),

  plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), vueJsxPlugin({ enableObjectSlots: false })],

  resolve: {
    alias: [
      { find: /^@idux(.*)$/, replacement: resolve(__dirname, './packages$1') },
      { find: /^@tests(.*)$/, replacement: resolve(__dirname, './tests$1') },
    ],
  },

  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    setupFiles: [resolve(__dirname, './tests/setup.ts')],
    coverage: {
      enabled: true,
      reporter: ['json', 'lcov', 'text', 'cobertura'],
      excludeNodeModules: true,
      include: ['packages/**/*'],
      exclude: [],
    },
    reporters: ['default'],
  },

  define: {
    __DEV__: true,
  },
})
