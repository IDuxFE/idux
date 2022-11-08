import { dirname, join } from 'path'

import { existsSync, readFileSync, readdirSync } from 'fs-extra'
// @ts-ignore
import { kebabCase, upperFirst } from 'lodash'
import { loadFront } from 'yaml-front-matter'

import marked from './marked'
import { TitleMeta, generateTitle, withoutSuffix } from './utils'

export function parseIndexDocs(id: string, raw: string): string {
  const [filename, _, componentName, packageName] = id.split('/').reverse()
  const [, language] = filename.split('.')

  const { __content, ...indexMeta } = loadFront(raw)
  const title = generateTitle(indexMeta as TitleMeta)
  const description = marked(__content)

  const demoMetas = getDemoMetas(id, packageName, componentName)
  const apiDocName = getDocCompName(id, 'Api')
  const overviewDocName = getDocCompName(id, 'Overview')
  const designDocName = getDocCompName(id, 'Design')
  const themeDocName = indexMeta.theme ? getDocCompName(id, 'Theme') : ''

  return (
    generaComponentScript(
      packageName,
      componentName,
      demoMetas,
      apiDocName,
      overviewDocName,
      designDocName,
      themeDocName,
      language,
    ) +
    generaComponentTemplate(
      title,
      description,
      demoMetas,
      apiDocName,
      overviewDocName,
      designDocName,
      themeDocName,
      language,
    )
  )
}

function getDemoMetas(id: string, packageName: string, componentName: string) {
  const demoPath = join(dirname(id), '..', 'demo')
  const demoMetas: any[] = []

  if (existsSync(demoPath)) {
    readdirSync(demoPath).forEach(demo => {
      if (demo.endsWith('.md')) {
        const { order, title } = loadFront(readFileSync(join(demoPath, demo)))
        const demoName = withoutSuffix(demo)
        const importName = `Demo${demoName}`
        const importStr = `import ${importName} from '../demo/${demo}'`

        demoMetas.push({ order, title, importStr, importName, packageName, componentName, demoName })
      }
    })
  }

  demoMetas.sort((a, b) => a.order - b.order)

  return demoMetas
}

function getDocCompName(id: string, fileType: string) {
  const docPath = id.replace('Index', fileType)
  return existsSync(docPath) ? `${fileType}Docs` : ''
}

const locale: Record<string, Record<string, string>> = {
  showDev: { zh: '显示开发专用演示', en: 'Expand development examples' },
  hideDev: { zh: '隐藏开发专用演示', en: 'Collapse development examples' },
  demo: { zh: '示例', en: 'Examples' },
  api: { zh: 'API', en: 'API' },
  overview: { zh: '概述', en: 'Overview' },
  design: { zh: '指南', en: 'Design' },
  theme: { zh: '主题', en: 'Theme' },
}

function generaComponentScript(
  packageName: string,
  componentName: string,
  demoMetas: any[],
  apiDocName: string,
  overviewDocName: string,
  designDocName: string,
  themeDocName: string,
  language: string,
): string {
  const imports = demoMetas.map(item => item.importStr)
  const components = demoMetas.map(item => item.importName)
  if (apiDocName) {
    imports.push(`import ${apiDocName} from './Api.${language}.md'`)
    components.push(apiDocName)
  }
  if (designDocName) {
    imports.push(`import ${designDocName} from './Design.${language}.md'`)
    components.push(designDocName)
  }
  if (overviewDocName) {
    imports.push(`import ${overviewDocName} from './Overview.${language}.md'`)
    components.push(overviewDocName)
  }
  if (themeDocName) {
    imports.push(`import ${themeDocName} from './Theme.${language}.md'`)
    components.push(themeDocName)
  }

  const docsName = `Docs${upperFirst(packageName)}${upperFirst(componentName)}`

  return `
<script lang='ts'>
  import { ref, watch} from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  ${imports.join('\n')}

export default {
  name: '${docsName}',
  components: { 
    ${components.join(',')} 
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    const checkedDoc = ref(route.query.tab ?? (${demoMetas.length} ? "demo" : 'design'))

    watch(checkedDoc, tab => {
      router.push({ query: { tab } })
    })

    const docRadioData = [
      ${demoMetas.length ? `{ label: '${locale.demo[language]}', value: 'demo' }` : ''},
      ${apiDocName ? `{ label: '${locale.api[language]}', value: 'api' }` : ''},
      ${overviewDocName ? `{ label: '${locale.overview[language]}', value: 'overview' }` : ''},
      ${designDocName ? `{ label: '${locale.design[language]}', value: 'design' }` : ''},
      ${themeDocName ? `{ label: '${locale.theme[language]}', value: 'theme' }` : ''},
    ].filter(Boolean)
    const showDevDemo = ref(__DEV__)

    return { checkedDoc, docRadioData, showDevDemo }
  },
}
</script>`
}

function generaComponentTemplate(
  title: string,
  description: string,
  demoMetas: any[],
  apiDocName: string,
  overviewDocName: string,
  designDocName: string,
  themeDocName: string,
  language: string,
) {
  const docs: string[] = []
  demoMetas.length > 0 && docs.push(generateDemos(demoMetas, language))
  apiDocName && docs.push(`<${apiDocName} v-show="checkedDoc === 'api'" />`)
  overviewDocName && docs.push(`<${overviewDocName} v-show="checkedDoc === 'overview'" />`)
  designDocName && docs.push(`<${designDocName} v-show="checkedDoc === 'design'" />`)
  themeDocName && docs.push(`<${themeDocName} v-show="checkedDoc === 'theme'" />`)

  return `<template>
  <article class="site-doc-wrapper">
   ${generateHeader(title, description)}
   ${docs.join('\n')}
  </article>
</template>
`
}

function generateHeader(title: string, description: string) {
  return `
<section class="markdown site-doc-header">
	${title}
	<div class="markdown site-doc-description">
		${description}
	</div>
  <IxRadioGroup v-model:value="checkedDoc" :dataSource="docRadioData" size="lg" buttoned />
</section>
`
}

function generateDemos(demoMetas: any[], language: string) {
  const links = demoMetas.map(
    meta => `<IxAnchorLink
        v-if="showDevDemo || ${!meta.dev}"
        href="#${meta.packageName}-${meta.componentName}-${kebabCase(meta.demoName)}"
        title="${meta.title[language]}" />`,
  )

  return `
<section class="site-doc-demo" v-show="checkedDoc === 'demo'">
  <IxAnchor class="site-anchor" affix :offset="16">${links.join('')}</IxAnchor>
  ${demoMetas
    .map(item => (item.dev ? `<${item.importName} v-if="showDevDemo" />` : `<${item.importName} />`))
    .join('\n')}
</section>`
}
