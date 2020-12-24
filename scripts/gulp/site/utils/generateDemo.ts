import { ensureDirSync, readFileSync, writeFileSync } from 'fs-extra'
import { join } from 'path'
import { generateTitle } from './generateTitle'
import { upperFirstCamelCase } from './tools'
import { DemoInfo, Meta } from './types'

interface DemoContext {
  packageName: string
  componentName: string
  zh: {
    path: string
    meta: Meta
    whenToUse: string
    api: string
  }
  demoMap: Record<string, DemoInfo>
}

const templateDemo = readFileSync(join(__dirname, '../template/demo-component.html'), { encoding: 'utf-8' })
const templateSplit = readFileSync(join(__dirname, '../template/example-split.html'), { encoding: 'utf-8' })
const templateUnion = readFileSync(join(__dirname, '../template/example-union.html'), { encoding: 'utf-8' })

export function generateDemo(outputDirname: string, context: DemoContext): void {
  ensureDirSync(outputDirname)
  const innerMap = generateExample(outputDirname, context)
  const demoTemplate = generateTemplate(context, innerMap['zh'])
  const demoComponent = generateDemoComponent(context, innerMap.imports, innerMap.components)
  writeFileSync(join(outputDirname, `Zh.vue`), demoTemplate['zh'] + demoComponent['zh'])
}

function generateExample(outputDirname: string, context: DemoContext) {
  const demoMap = context.demoMap
  const isZhUnion = context['zh'].meta.cols
  const demoList = []
  for (const key in demoMap) {
    demoList.push(Object.assign({ name: key }, demoMap[key]))
  }
  demoList.sort((pre, next) => pre.meta.order - next.meta.order)
  let firstZhPart = ''
  let secondZhPart = ''
  let zhPart = ''
  let imports = ''
  let components = ''
  demoList.forEach((item, index) => {
    const demoComponentName = generateDemoComponentName(item.name)
    imports += `import ${demoComponentName} from './${demoComponentName}.vue'\n`
    components += `${demoComponentName},`
    writeFileSync(join(outputDirname, `${demoComponentName}.vue`), item.rawCode)
    zhPart += item.codeBox['zh']
    if (index % 2 === 0) {
      firstZhPart += item.codeBox['zh']
    } else {
      secondZhPart += item.codeBox['zh']
    }
  })
  return {
    imports,
    components,
    zh: isZhUnion
      ? templateUnion.replace(/{{content}}/g, zhPart)
      : templateSplit.replace(/{{first}}/g, firstZhPart).replace(/{{second}}/g, secondZhPart),
  }
}

function generateTemplate(context: DemoContext, zh: string) {
  const { packageName, componentName, demoMap, zh: zhCN } = context
  const titleMap = { zh: generateTitle(zhCN.meta, zhCN.path) }
  return {
    zh: wrapperAll(
      generateToc('zh', packageName, componentName, demoMap),
      wrapperHeader(titleMap.zh, zhCN.whenToUse, 'zh', zh) + wrapperAPI(zhCN.api),
    ),
  }
}

function generateDemoComponent(content: DemoContext, imports: string, components: string) {
  const componentName = content.componentName
  const demoComponentTemplate = templateDemo.replace(/{{imports}}/g, imports).replace(/{{components}}/g, components)
  const zhOutput = demoComponentTemplate.replace(/{{componentName}}/g, generateComponentName(componentName, 'zh'))

  return { zh: zhOutput }
}

function wrapperAll(toc: string, content: string) {
  return `<template>
  <article>${toc}${content}</article>
</template>
`
}

function generateToc(language: string, type: string, name: string, demoMap: Record<string, DemoInfo>) {
  const linkArray = []
  for (const key in demoMap) {
    linkArray.push({
      // TODO link
      content: `<a href="#${type}-${name}-demo-${key}" title="${demoMap[key].meta.title[language]}"></a>`,
      order: demoMap[key].meta.order,
    })
  }
  linkArray.sort((pre, next) => pre.order - next.order)
  // TODO link
  linkArray.push({ content: `<a href="#api" title="API"></a>` })
  const links = linkArray.map(link => link.content).join('')
  // TODO affix,anchor
  return `<a class="toc-affix">
  <a @click="goLink($event)">
    ${links}
  </a>
</a>`
}

function wrapperHeader(title: string, whenToUse: string, language: string, example: string) {
  if (example) {
    const examples = language === 'zh' ? '代码演示' : 'Examples'
    const expand = language === 'zh' ? '展开全部代码' : 'Expand All Code'
    return `<section class="markdown">
	${title}
	<section class="markdown">
		${whenToUse}
	</section>
	<h2>
		<span>${examples}</span>
		<ix-icon name="appstore" title="${expand}" @click="expandAllCode()" />
	</h2>
</section>${example}`
  } else {
    return `<section class="markdown">
	${title}
	<section class="markdown">
		${whenToUse}
  </section>
</section>`
  }
}

function wrapperAPI(content: string) {
  return `<section class="markdown api-container">${content}</section>`
}

function generateComponentName(component: string, language: string) {
  return `Demo${upperFirstCamelCase(component)}${upperFirstCamelCase(language)}`
}

function generateDemoComponentName(domeName: string) {
  return `Demo${upperFirstCamelCase(domeName)}`
}
