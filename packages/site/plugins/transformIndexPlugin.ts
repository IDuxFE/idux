import type { Plugin } from 'vite'

const serveHtml = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iDux</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`

export function transformIndexPlugin(): Plugin {
  return {
    name: 'idux:transformIndex',
    enforce: 'pre',
    transformIndexHtml(html, ctx) {
      const isServe = ctx.server ? ctx.server.config.command === 'serve' : false
      return isServe ? serveHtml : html
    },
  }
}
