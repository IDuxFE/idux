import type { Plugin } from 'vite'
import { parseMd } from './md'

export function mdPlugin(): Plugin {
  let vuePlugin: Plugin

  return {
    name: 'vite:md',
    enforce: 'pre',
    configResolved(config) {
      vuePlugin = config.plugins.find(p => p.name === 'vite:vue')!
    },
    transform(raw, id) {
      if (id.endsWith('.md')) {
        return parseMd(id, raw)
      }
      return
    },
    async handleHotUpdate(ctx) {
      if (ctx.file.endsWith('.md')) {
        return vuePlugin.handleHotUpdate!({
          ...ctx,
          async read() {
            return parseMd(ctx.file, await ctx.read())
          },
        })
      }
    },
  }
}
