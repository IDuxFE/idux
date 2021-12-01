import { join } from 'path'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { RollupOptions } from 'rollup'
import typescript from 'rollup-plugin-typescript2'

import { esbuildPlugin } from './esbuildPlugin'

const externalDeps = [
  'vue',
  '@vue',
  '@idux',
  '@juggle/resize-observer',
  '@popperjs/core',
  'dayjs',
  'date-fns',
  'lodash-es',
  'vue-types',
]

interface Options {
  targetDirname: string
  distDirname: string
  packageName: string
  compName?: string
}

export const getRollupOptions = (options: Options): RollupOptions => {
  const { targetDirname, distDirname, compName = '' } = options

  const input = join(targetDirname, compName, 'index.ts')
  const outputFile = join(distDirname, compName, 'index.js')

  const plugins = [
    nodeResolve(),
    replace({ __DEV__: "process.env.NODE_ENV !== 'production'", preventAssignment: true }),
    vuePlugin(),
    vueJsxPlugin({ enableObjectSlots: false }),
  ]

  if (compName) {
    plugins.push(esbuildPlugin())
  } else {
    const tsOptions = {
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        include: ['packages/**/*', 'typings/*'],
        exclude: ['packages/site/*', 'packages/**/__tests__/*', 'packages/**/demo/*'],
      },
      abortOnError: false,
    }
    plugins.push(typescript(tsOptions))
  }

  return {
    input,
    output: {
      format: 'es',
      file: outputFile,
    },
    external(id) {
      return externalDeps.some(k => new RegExp('^' + k).test(id))
    },

    plugins,
  }
}
