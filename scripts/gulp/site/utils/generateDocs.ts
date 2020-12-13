import { ensureDirSync, readFileSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import remark from 'remark'
import { generateTitle } from './generateTitle'
import { getMeta } from './getMeta'
import marked from './marked'
import { nonBindAble, upperFirstCamelCase } from './tools'
import { AstNode, DocsLanguage, Meta } from './types'

interface BaseInfo {
  meta: Meta
  path: string
  content: string
  rawContent: string
}

const templatePath = join(__dirname, '../template/docs-component.html')
const templateString = readFileSync(templatePath, { encoding: 'utf-8' })

export function generateDocs(outputDirname: string, docsMap: Record<string, Record<DocsLanguage, Buffer>>): void {
  const docsDirname = join(outputDirname, 'docs')
  Object.keys(docsMap).forEach(name => {
    const docsPath = join(docsDirname, name)
    ensureDirSync(docsPath)

    const zh = baseInfo(docsMap[name]['zh'], `docs/${name}.zh.md`)
    const template = generateTemplate(zh)
    const component = generateComponent(upperFirstCamelCase(name))
    writeFileSync(join(docsPath, `Zh-CN.vue`), template['zh'] + component['zh'])
  })
}

function baseInfo(file: Buffer, path: string): BaseInfo {
  const { __content: content, ...meta } = getMeta(file)
  return {
    meta: meta as Meta,
    path: path,
    content: marked(content),
    rawContent: content,
  }
}

function generateTemplate(zh: BaseInfo): Record<DocsLanguage, string> {
  return {
    zh: wrapperDocs(generateToc(zh.meta, zh.rawContent), generateTitle(zh.meta, zh.path), nonBindAble(zh.content)),
  }
}

function wrapperDocs(toc: string, title: string, content: string): string {
  return `<template>
  <article class="markdown">${title}${toc}
  <section class="markdown">${content}</section>
  </article>
</template>  
`
}

function generateToc(meta: Meta, rawContent: string): string {
  if (meta.timeline) return ''

  const _remark = remark()
  const ast = (_remark.parse(rawContent) as unknown) as AstNode
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

function generateComponent(componentName: string): Record<DocsLanguage, string> {
  return {
    zh: templateString.replace(/{{componentName}}/g, `Docs${componentName}ZhCN`),
  }
}
