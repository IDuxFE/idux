import { join } from 'path'
import { RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'
import { esbuildPlugin } from './esbuildPlugin'
import typescript from 'rollup-plugin-typescript2'

const externalDeps = ['vue', '@vue', '@idux', '@juggle/resize-observer', '@popperjs/core', 'lodash', 'vue-types']

interface Options {
  targetDirname: string
  distDirname: string
  packageName: string
  compName?: string
}

export const getRollupOptions = (options: Options): RollupOptions => {
  const { targetDirname, distDirname, packageName, compName = '' } = options

  const input = join(targetDirname, compName, 'index.ts')
  const outputFile = join(distDirname, compName, 'index.js')

  const plugins = [nodeResolve(), vuePlugin(), vueJsxPlugin()]

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
      paths(id) {
        const pathReg = new RegExp(`^@idux/${packageName}`)
        if (pathReg.test(id)) {
          return id.replace(`@idux/${packageName}`, '..')
        }
        return id
      },
    },

    external(id) {
      return externalDeps.some(k => new RegExp('^' + k).test(id))
    },

    plugins,
  }
}
