// @ts-nocheck
/* eslint-disable */

import { type ViteDevServer, createServer } from 'vite'

// eslint-disable-next-line import/no-unresolved
import { ViteNodeServer } from 'vite-node/server'
// eslint-disable-next-line import/no-unresolved
import { ViteNodeRunner } from 'vite-node/client'

import vuePlugin from '@vitejs/plugin-vue'
import vueJsxPlugin from '@vitejs/plugin-vue-jsx'

import { resolve } from 'path'

export { createDomEnv } from './dom'

let server: ViteDevServer
let runner: ViteNodeRunner
let refCnt: number = 0

export async function getViteNodeRunner(): Promise<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: (file: string) => Promise<any>
  destroy: () => Promise<void>
}> {
  refCnt++
  if (!runner) {
    server = await createServer({
      plugins: [vuePlugin({ include: [/\.vue$/, /\.md$/] }), vueJsxPlugin({ enableObjectSlots: false })],
      optimizeDeps: {
        // It's recommended to disable deps optimization
        disabled: true,
      },
      resolve: {
        alias: [
          { find: '@idux/cdk', replacement: resolve(__dirname, '../../packages/cdk') },
          { find: '@idux/components', replacement: resolve(__dirname, '../../packages/components') },
          { find: '@idux/pro', replacement: resolve(__dirname, '../../packages/pro') },
        ],
      },
    })
    // this is need to initialize the plugins
    await server.pluginContainer.buildStart({})

    // create vite-node server
    const node = new ViteNodeServer(server)

    // create vite-node runner
    runner = new ViteNodeRunner({
      root: server.config.root,
      base: server.config.base,
      // when having the server and runner in a different context,
      // you will need to handle the communication between them
      // and pass to this function
      fetchModule(id) {
        return node.fetchModule(id)
      },
      resolveId(id, importer) {
        return node.resolveId(id, importer)
      },
    })
  }

  return {
    run: (file: string) => runner.executeFile(file),
    destroy: async () => {
      refCnt--

      if (refCnt <= 0) {
        await server.close()
      }
    },
  }
}
