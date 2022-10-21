import { lowerFirst } from 'lodash'
import { loadFront } from 'yaml-front-matter'

import marked from './marked'
import { TitleMeta, generateTitle } from './utils'

export function parseNormalDocs(id: string, raw: string): string {
  const [filename] = id.split('/').reverse()
  const { __content: content, ...meta } = loadFront(raw)
  // 用 title 判断是否为 global docs
  const isGlobal = !!meta.title
  const isChangeLog = filename.startsWith('Changelog')
  const toc = generateToc(content, isGlobal, isChangeLog)
  const markedContent = marked(content)

  if (isGlobal) {
    const title = generateTitle(meta as TitleMeta)

    return `<template>
  <article class="markdown site-global-docs">
    ${toc}
    ${title}
    <section class="markdown">${markedContent}</section>
  </article>
</template>
`
  }

  const type = lowerFirst(filename.split('.')[0])

  return `<template>
  <section class="markdown site-doc-${type}">
    ${toc}
    ${markedContent}
  </section>
</template>`
}

interface NewHeading extends marked.Tokens.Heading {
  children?: NewHeading[]
}

function generateToc(content: string, isGlobal: boolean, isChangeLog: boolean): string {
  const lexer = new marked.Lexer()
  const tokens = lexer.lex(content)
  const res: NewHeading[] = []

  let depthFlag = -1
  let lastDepth2Index = -1
  // 收集2，3级标题，相邻的3级标题嵌套进2级标题中
  // 如果不是 global docs 就收集 3, 4 级标题
  tokens.forEach(item => {
    if (item.type === 'heading' && item.depth > 1) {
      // 以第一个 depth 作为标识符
      if (depthFlag === -1) {
        depthFlag = item.depth
      }
      if (item.depth === depthFlag) {
        res.push({ ...item, children: [] })
        lastDepth2Index++
      } else if (!isChangeLog && item.depth - 1 === depthFlag) {
        res[lastDepth2Index]?.children!.push(item)
      }
    }
  })

  const render = (headings: NewHeading) => {
    const children = headings.children
    const lowerText = headings.text.toLowerCase().replace(/[\s?.]/g, '-')
    const text = headings.text.replace(/__.*$/, '')
    if (children?.length) {
      let str = ''
      for (const item of children) {
        str += render(item)
      }
      return `<IxAnchorLink href="#${lowerText}" title="${text}">${str}</IxAnchorLink>`
    } else {
      return `<IxAnchorLink href="#${lowerText}" title="${text}" />`
    }
  }
  return `<IxAnchor class="site-anchor" affix :offset="16">${res.map(render).join('')}</IxAnchor>`
}
