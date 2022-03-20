import { loadFront } from 'yaml-front-matter'

import { TitleMeta, generateTitle } from './generateTitle'
import marked from './marked'
import { generateDocsToc, nonBindAble } from './utils'

interface Meta {
  order: number
  title: string
  toc: boolean
}

const scriptTemplate = `<script lang='ts'>
export default {
  setup() {
    const goLink = (link: string) => {
      if (window) {
        window.location.hash = link
      }
    }
    return { goLink }
  },
}
</script>
`

export function parseGlobalDocs(id: string, raw: string): string {
  const [filename, docsDirname, componentName, moduleName, packageName] = id.split('/').reverse()
  const docsPath = `${packageName}/${moduleName}/${componentName}/${docsDirname}/${filename}`
  const { __content: content, ...meta } = loadFront(raw)
  const toc = generateDocsToc(meta as Meta, content)
  const title = generateTitle({ ...(meta as Omit<TitleMeta, 'path'>), path: docsPath })
  const markedContent = nonBindAble(marked(content))
  const template = wrapperDocs(toc, title, markedContent)
  const script = scriptTemplate
  return template + script
}

function wrapperDocs(toc: string, title: string, content: string): string {
  return `<template>
  <article class="markdown">${title}${toc}
    <section class="markdown">${content}</section>
  </article>
</template>
`
}
