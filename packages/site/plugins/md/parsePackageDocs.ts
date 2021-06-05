/* eslint-disable @typescript-eslint/no-explicit-any */
import remark from 'remark'
import { dirname, join } from 'path'
import { existsSync, readdirSync, readFileSync } from 'fs-extra'
import { loadFront } from 'yaml-front-matter'

import marked from './marked'
import { generateTitle } from './generateTitle'
import { getComponentScript, getExampleTemplate } from './template'
import { nonBindAble, withoutSuffix } from './utils'

interface Meta {
  order: number
  title: string
  timeline: boolean
}

const _remark = remark()

export function parsePackageDocs(id: string, raw: string): string {
  const [filename, docsDirname, componentName, moduleName] = id.split('/').reverse()
  const docsPath = `${moduleName}/${componentName}/${docsDirname}/${filename}`
  const [, language] = filename.split('.')

  const { __content: content, single = false, ...meta } = loadFront(raw)

  const title = generateTitle({ ...(meta as Meta), path: docsPath })
  const { description, api } = parseContent(content)
  const demoMetas = getDemoMetas(id)
  const componentNames = demoMetas.map(item => item.componentName)

  const examples = generateExample(single, componentNames)
  const docsTemplate = wrapperDocsTemplate(
    generateToc(demoMetas, language, moduleName, componentName),
    generateHeader(title, description, language),
    examples,
    api,
  )

  const docsScript = getComponentScript(
    'Demo' + componentName,
    demoMetas.map(item => item.importStr),
    componentNames,
  )

  return docsTemplate + docsScript
}

function parseContent(content: string) {
  const ast = _remark.parse(content)

  // 分离前后两部分
  let isApi = false
  let description = ''
  let api = ''
  ast.children.forEach(item => {
    const { type, depth } = item
    if (type === 'heading' && depth === 2 && item.children[0].value === 'API') {
      isApi = true
    }
    if (!isApi) {
      description += marked(_remark.stringify(item as any))
    } else {
      api += marked(_remark.stringify(item as any))
    }
  })
  return {
    description: nonBindAble(description),
    api: nonBindAble(api),
  }
}

function getDemoMetas(id: string) {
  const demoPath = join(dirname(id), '..', 'demo')
  const demoMates: any[] = []

  if (existsSync(demoPath) && readdirSync(demoPath).length > 0) {
    readdirSync(demoPath).forEach(demo => {
      if (demo.endsWith('.md')) {
        const { order, title } = loadFront(readFileSync(join(demoPath, demo)))
        const componentName = withoutSuffix(demo)
        const importStr = `import ${componentName} from '../demo/${demo}'`

        demoMates.push({ order, title, importStr, componentName })
      }
    })
  }

  demoMates.sort((a, b) => a.order - b.order)

  return demoMates
}

function generateExample(single: boolean, components: string[]) {
  let firstZhPart = ''
  let secondZhPart = ''
  components.forEach((item, index) => {
    if (single) {
      firstZhPart += `<${item} />`
    } else {
      if (index % 2 === 0) {
        firstZhPart += `<${item} />`
      } else {
        secondZhPart += `<${item} />`
      }
    }
  })
  return getExampleTemplate(single, firstZhPart, secondZhPart)
}

function wrapperDocsTemplate(toc: string, header: string, examples: string, api: string): string {
  return `
<template>
  <article>
  ${toc}
  ${header}
  <section class="example-wrapper">${examples}</section>
  <section class="markdown api-wrapper">${api}</section>
  </article>
</template>  
`
}

function generateToc(demoMetas: any[], language: string, module: string, component: string) {
  const links = []
  demoMetas.forEach(meta => {
    // TODO link
    links.push(
      `<a href="#${module}-${component}-demo-${meta.componentName}" title="${meta.title[language]}">${meta.title[language]}</a>`,
    )
  })

  // TODO link
  links.push(`<a href="#api" title="API"></a>`)

  // TODO affix,anchor
  return `<a class="toc-wrapper">
  <a @click="goLink($event)">
    ${links.join('  ')}
  </a>
</a>`
}

function generateHeader(title: string, description: string, language: string) {
  const examples = language === 'zh' ? '代码演示' : 'Examples'
  const expand = language === 'zh' ? '展开全部' : 'Expand All'
  return `
<section class="markdown header-wrapper">
	${title}
	<section class="markdown">
		${description}
	</section>
	<h2>
		<span>${examples}</span>
		<ix-icon name="appstore" class="code-box-expand-trigger" title="${expand}" @click="expandAll()" />
	</h2>
</section>
`
}
