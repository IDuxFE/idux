import remark from 'remark'
import { loadFront } from 'yaml-front-matter'

import { generateTitle } from './generateTitle'
import marked from './marked'
import { nonBindAble } from './utils'

interface Meta {
  order: number
  title: string
  timeline: boolean
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

const _remark = remark()

export function parseGlobalDocs(id: string, raw: string): string {
  const [filename, docsDirname] = id.split('/').reverse()
  const docsPath = `${docsDirname}/${filename}`
  const { __content: content, ...meta } = loadFront(raw)
  const toc = generateToc(meta as Meta, content)
  const title = generateTitle({ ...(meta as Meta), path: docsPath })
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

function generateToc(meta: Meta, content: string): string {
  if (meta.timeline) {
    return ''
  }

  const ast = _remark.parse(content)
  let links = ''
  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth === 2) {
      const text = child.children[0].value
      const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g, '')
      links += `<a href="#${lowerText}" title="${text}"></a>`
    }
  })

  // TODO affix,anchor
  return `<a class="toc-affix"><a @click="goLink($event)">${links}</a></a>`
}
