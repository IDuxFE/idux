import { join, resolve } from 'path'

import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { upperFirst } from 'lodash'
import { Plugin, RollupOptions } from 'rollup'
import typescript from 'rollup-plugin-typescript2'

import { esbuildPlugin } from './esbuild'
import cdkPackage from '../../../packages/cdk/package.json'
import componentsPackage from '../../../packages/components/package.json'
import proPackage from '../../../packages/pro/package.json'

interface Options {
  targetDirname: string
  distDirname: string
  packageName: string
  compName?: string
  minify?: boolean
}

const externalDeps = [
  'vue',
  '@vue',
  '@idux',
  '@floating-ui/dom',
  '@emotion/hash',
  '@atlaskit/pragmatic-drag-and-drop',
  '@atlaskit/pragmatic-drag-and-drop-hitbox',
  '@atlaskit/pragmatic-drag-and-drop-auto-scroll',
  'date-fns',
  'lodash-es',
  'ajv',
]
const replaceOptions = {
  __DEV__: "process.env.NODE_ENV !== 'production'",
  __TEST__: false,
  __VERSION_CDK__: `'${cdkPackage.version}'`,
  __VERSION_COMPONENTS__: `'${componentsPackage.version}'`,
  __VERSION_PRO__: `'${proPackage.version}'`,
  preventAssignment: true,
}

export const getRollupSingleOptions = (options: Options): RollupOptions => {
  const { targetDirname, distDirname, compName = '', minify = false } = options

  const input = join(targetDirname, compName, 'index.ts')
  const outputFile = join(distDirname, compName, 'index.js')

  const plugins = [
    nodeResolve(),
    replace(replaceOptions),
    vuePlugin(),
    vueJsxPlugin({ enableObjectSlots: false }),
    esbuildPlugin({ minify }),
  ] as Plugin[]

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

export const getRollupFullOptions = (options: Options): RollupOptions => {
  const { targetDirname, distDirname, packageName, minify = false } = options

  const plugins = [
    alias({
      entries: [
        {
          find: `@idux/${packageName}`,
          replacement: resolve(targetDirname, `../${packageName}`),
          customResolver: (id: string) => {
            return resolve(id, 'index.ts')
          },
        },
      ],
    }),
    nodeResolve(),
    commonjs(),
    replace(replaceOptions),
    vuePlugin(),
    vueJsxPlugin({ enableObjectSlots: false }),
    esbuildPlugin({
      minify,
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  ] as Plugin[]

  return {
    input: join(targetDirname, 'index.ts'),
    output: [
      {
        format: 'umd',
        file: join(distDirname, `index.full${minify ? '.min' : ''}.js`),
        exports: 'named',
        name: `IDux${upperFirst(packageName)}`,
        globals: name => {
          if (name === 'vue') {
            return 'Vue'
          }
          if (name === 'ajv') {
            return 'Ajv'
          }
          if (name === 'ajv-formats') {
            return 'AjvFormats'
          }
          if (name.startsWith('@idux')) {
            const [, _packageName] = name.split('/')
            return `IDux${upperFirst(_packageName)}`
          }
          return ''
        },
      },
      {
        format: 'esm',
        file: join(distDirname, `index.full${minify ? '.min' : ''}.mjs`),
      },
    ],
    external: id => {
      return id === 'vue' || id.startsWith('ajv') || (id.startsWith('@idux') && !id.startsWith(`@idux/${packageName}`))
    },
    plugins,
  }
}

export const getRollupDeclarationOptions = (options: Options): RollupOptions => {
  const { targetDirname, distDirname, packageName } = options

  const input = join(targetDirname, 'index.ts')
  const outputFile = join(distDirname, packageName, 'temp.js')

  const plugins = [
    nodeResolve(),
    replace(replaceOptions),
    vuePlugin(),
    vueJsxPlugin({ enableObjectSlots: false }),
    typescript({
      abortOnError: false,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        emitDeclarationOnly: true,
        include: ['packages/**/*', 'typings/*'],
        exclude: ['packages/site/*', 'packages/**/__tests__/*', 'packages/**/demo/*'],
      },
    }),
  ] as Plugin[]

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
