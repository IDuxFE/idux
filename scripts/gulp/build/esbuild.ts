import { dirname, extname, join, relative, resolve } from 'path'

import { FilterPattern, createFilter } from '@rollup/pluginutils'
import { Loader, Message, TransformOptions, transform } from 'esbuild'
import { existsSync, statSync } from 'fs-extra'
import { Plugin } from 'rollup'

const cleanUrl = (url: string) => url.replace(/\?.*$/, '').replace(/#.*$/, '')

interface Options extends TransformOptions {
  include?: FilterPattern
  exclude?: FilterPattern
}

const defaultOptions: Options = {
  include: /\.(tsx?|jsx)$/,
  exclude: /\.(mjs?|js)$/,
  target: ['ESNext', 'node16', 'chrome79', 'edge79', 'firefox72', 'safari13'],
  minify: false,
  sourcemap: false,
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  legalComments: 'none',
}

export const esbuildPlugin = (options?: Options): Plugin => {
  const { include, exclude, ...restOptions } = { ...defaultOptions, ...options }
  const filter = createFilter(include, exclude)

  const extensions = ['.js', '.jsx', '.ts', '.tsx']
  const resolveFile = (resolved: string, addIndex = false) => {
    for (const ext of extensions) {
      const file = addIndex ? join(resolved, `index${ext}`) : `${resolved}${ext}`
      if (existsSync(file)) {
        return file
      }
    }
    return null
  }
  return {
    name: 'idux:esbuild',

    resolveId(id, importer) {
      if (!importer || id[0] !== '.') {
        return null
      }

      const resolved = resolve(dirname(importer), id)
      let file = resolveFile(resolved)
      if (!file && statSync(resolved).isDirectory()) {
        file = resolveFile(resolved, true)
      }
      return file
    },

    async transform(code, id) {
      if (!filter(id) && !filter(cleanUrl(id))) {
        return null
      }

      const { warnings, ...result } = await transformWithEsbuild(code, id, restOptions)
      warnings.forEach(warning => this.warn(prettifyMessage(warning, id)))
      return result
    },

    async renderChunk(code, chunk) {
      const { target, minify } = restOptions

      if (!target && !minify) {
        return null
      }
      return transformWithEsbuild(code, chunk.fileName, restOptions)
    },
  }
}

async function transformWithEsbuild(code: string, filename: string, options?: TransformOptions) {
  // if the id ends with a valid ext, use it (e.g. vue blocks)
  // otherwise, cleanup the query before checking the ext
  const ext = extname(/\.\w+$/.test(filename) ? filename : cleanUrl(filename))
  const lastExt = ext.slice(1)
  const loader = (lastExt === 'mjs' ? 'js' : lastExt) as Loader

  const transformOptions: TransformOptions = {
    loader,
    sourcefile: filename,
    ...options,
  }

  try {
    const result = await transform(code, transformOptions)
    return {
      ...result,
      map: result.map ? JSON.parse(result.map) : null,
    }
  } catch (e: any) {
    // patch error information
    if (e.errors) {
      e.frame = ''
      e.errors.forEach((m: Message) => {
        e.frame += `\n` + prettifyMessage(m, code)
      })
      e.loc = e.errors[0].location
    }
    throw e
  }
}

function prettifyMessage(message: Message, id: string) {
  let result = '[idux:esbuild]: '
  if (message.location) {
    const { line, column } = message.location
    result += `${relative(process.cwd(), id)}(${line}:${column}): `
  }
  result += message.text
  return result
}
