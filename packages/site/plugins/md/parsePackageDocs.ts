/* eslint-disable @typescript-eslint/no-explicit-any */
import { dirname, join } from 'path'

import { existsSync, readFileSync, readdirSync } from 'fs-extra'
import remark from 'remark'
import { loadFront } from 'yaml-front-matter'

import { TitleMeta, generateTitle } from './generateTitle'
import marked from './marked'
import { getComponentScript, getExampleTemplate } from './template'
import { generateDocsToc, nonBindAble, withoutSuffix } from './utils'

const _remark = remark()

export function parsePackageDocs(id: string, raw: string): string {
  const [filename, docsDirname, componentName, moduleName, packageName] = id.split('/').reverse()
  const docsPath = `${packageName}/${moduleName}/${componentName}/${docsDirname}/${filename}`
  const [, language] = filename.split('.')
  const designDocPath = id.replace(/Index/g, 'Design')
  const designRaw = existsSync(designDocPath) ? readFileSync(designDocPath, { encoding: 'utf-8' }) : ''
  const overviewDocPath = id.replace(/Index/g, 'Overview')
  const overviewRaw = existsSync(overviewDocPath) ? readFileSync(overviewDocPath, { encoding: 'utf-8' }) : ''

  const { __content: indexContent, ...indexMeta } = loadFront(raw)
  const { __content: designContent, ...designMeta } = loadFront(designRaw)
  const { __content: overviewContent, ...overviewMeta } = loadFront(overviewRaw)
  const title = generateTitle({ ...(indexMeta as Omit<TitleMeta, 'path'>), path: docsPath })
  const { description, api } = parseContent(indexContent)
  const demoMetas = getDemoMetas(id)

  const docsTemplate = wrapperDocsTemplate(
    generateToc(demoMetas, language, moduleName, componentName),
    generateDocsToc(designMeta, designContent),
    generateDocsToc(overviewMeta, overviewContent),
    generateHeader(title, description),
    generateExample(true, demoMetas),
    api,
    language,
    nonBindAble(marked(designContent)),
    nonBindAble(marked(overviewContent)),
  )

  const docsScript = getComponentScript(
    'Demo' + componentName,
    demoMetas.map(item => item.importStr),
    demoMetas.map(item => item.componentName),
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
  const demoMetas: any[] = []

  if (existsSync(demoPath) && readdirSync(demoPath).length > 0) {
    readdirSync(demoPath).forEach(demo => {
      if (demo.endsWith('.md')) {
        const { order, title } = loadFront(readFileSync(join(demoPath, demo)))
        const componentName = withoutSuffix(demo)
        const importStr = `import ${componentName} from '../demo/${demo}'`

        demoMetas.push({ order, title, importStr, componentName })
      }
    })
  }

  demoMetas.sort((a, b) => a.order - b.order)

  return demoMetas
}

function generateExample(single: boolean, components: any[]) {
  let firstZhPart = ''
  let secondZhPart = ''
  components.forEach((item, index) => {
    const comp = item.dev ? `<${item.componentName} v-if="showDevDemo" />` : `<${item.componentName} />`
    if (single) {
      firstZhPart += comp
    } else {
      if (index % 2 === 0) {
        firstZhPart += comp
      } else {
        secondZhPart += comp
      }
    }
  })
  return getExampleTemplate(single, firstZhPart, secondZhPart)
}

const locale: Record<string, Record<string, string>> = {
  examples: { zh: '代码演示', en: 'Examples' },
  showDev: { zh: '显示开发专用演示', en: 'Expand development examples' },
  hideDev: { zh: '隐藏开发专用演示', en: 'Collapse development examples' },
  develop: { zh: '开发指南', en: 'Develop Guide' },
  design: { zh: '设计指南', en: 'Design Guide' },
  overview: { zh: '概要说明', en: 'Overview' },
}

function wrapperDocsTemplate(
  developToc: string,
  designToc: string,
  overviewToc: string,
  header: string,
  examples: string,
  api: string,
  language: string,
  designContent: string,
  overviewContent: string,
): string {
  const content = `<h2 class="component-develop-header">
  ${locale.examples[language]}
  <span class="component-develop-header-tools">
    <IxTooltip :title="showDevDemo? '${locale.hideDev[language]}' : '${locale.showDev[language]}'">
      <IxIcon :name="showDevDemo? 'bug-filled' : 'bug'" @click="showDevDemo = !showDevDemo" />
    </IxTooltip>
  </span>
</h2>
<section class="component-develop-examples">${examples}</section>
<section class="markdown component-develop-api">${api}</section>
`

  if (!designContent && !overviewContent) {
    return `<template>
  <article class="component-wrapper">
    ${header}
    ${developToc}
    <br />
    ${content}
  </article>
</template>
`
  }

  const designTab = designContent
    ? `<IxTab key="design" title="${locale.design[language]}">
  <section class="markdown">${designContent}</section>
</IxTab>`
    : ''
  const overviewTab = overviewContent
    ? `<IxTab key="overview" title="${locale.overview[language]}">
  <section class="markdown">${overviewContent}</section>
</IxTab>`
    : ''
  return `
<template>
  <article class="component-wrapper">
    ${header}
    <template v-if="selectedTab === 'develop'">
      ${developToc}
    </template>
    <template v-else-if="selectedTab === 'design'">
      ${designToc}
    </template>
    <template v-else>
      ${overviewToc}
    </template>
    <IxTabs v-model:selectedKey="selectedTab" type="line" class="component-tabs">
      <IxTab key="develop" title="${locale.develop[language]}">
        <h2 class="component-develop-header">
          ${locale.examples[language]}
          <span class="component-develop-header-tools">
            <IxTooltip :title="showDevDemo? '${locale.hideDev[language]}' : '${locale.showDev[language]}'">
              <IxIcon :name="showDevDemo? 'bug-filled' : 'bug'" @click="showDevDemo = !showDevDemo" />
            </IxTooltip>
          </span>
        </h2>
        <section class="component-develop-examples">${examples}</section>
        <section class="markdown component-develop-api">${api}</section>
      </IxTab>
      ${designTab}
      ${overviewTab}
    </IxTabs>
  </article>
</template>
`
}

function generateHeader(title: string, description: string) {
  return `
<section class="markdown component-header">
	${title}
	<section class="markdown">
		${description}
	</section>
</section>
`
}

function generateToc(demoMetas: any[], language: string, module: string, component: string) {
  const links = demoMetas.map(
    meta =>
      `<IxAnchorLink href="#${module}-${component}-demo-${meta.componentName}" title="${meta.title[language]}"></IxAnchorLink>`,
  )

  links.push(`<IxAnchorLink href="#API" title="API"></IxAnchorLink>`)

  return `<IxAnchor class="toc-wrapper" affix offset="16" @click="goLink($event)">
  ${links.join('  ')}
</IxAnchor>`
}
