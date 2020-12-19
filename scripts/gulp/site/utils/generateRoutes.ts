/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from 'fs-extra'
import { join, resolve } from 'path'
import { DocsLanguage, Meta } from './types'

const templateRouter = readFileSync(resolve(__dirname, '../template/router.html'), { encoding: 'utf-8' })

export function generateRoutes(
  outputDirname: string,
  docsMeta: Record<string, Record<DocsLanguage, Meta>>,
  demoMeta: Record<string, Record<string, Meta>>,
): void {
  const routes: string[] = []
  const { docs, routes: docsRoutes } = handleDocsMeta(docsMeta)
  // writeFileSync(join(outputDirname, `docs.json`), JSON.stringify(docs, null, 2))
  routes.push(...docsRoutes)

  const { demoMap, routes: demoRoutes } = handleDemoMeta(demoMeta)
  routes.push(...demoRoutes)

  const components = []
  for (const name in demoMap.components) {
    const { language, children } = demoMap.components[name]
    components.push({ name, language, children })
  }

  const cdk = demoMap.cdk
  cdk.sort((pre, next) => pre.order - next.order)

  const sortMap: Record<string, number> = {
    General: 0,
    通用: 0,
    Layout: 1,
    布局: 1,
    Navigation: 2,
    导航: 2,
    'Data Entry': 3,
    数据录入: 3,
    'Data Display': 4,
    数据展示: 4,
    Feedback: 5,
    反馈: 5,
    Localization: 6,
    Other: 7,
    其他: 7,
  }
  components.sort((pre, next) => sortMap[pre.name] - sortMap[next.name])
  const fileContent = templateRouter
    .replace(/{{docs}}/g, JSON.stringify(docs, null, 2))
    .replace(/{{components}}/g, JSON.stringify(components, null, 2))
    .replace(/{{cdk}}/g, JSON.stringify(cdk, null, 2))
    .replace(/{{routes}}/g, routes.join('\n'))
  writeFileSync(join(outputDirname, `router.ts`), fileContent)
}

interface DocsItem {
  path: string
  title: string
  language: DocsLanguage
  description: string
  order: number
}

function handleDocsMeta(docsMeta: Record<string, Record<DocsLanguage, Meta>>) {
  const docs: DocsItem[] = []
  const routes: string[] = []
  for (const key in docsMeta) {
    const { title, description, order } = docsMeta[key]['zh']
    const path = `/docs/${key}/zh`
    docs.push({ path, title, language: 'zh', description, order: order })
    routes.push(`{path: '/docs/${key}/zh', 'component': () => import('./docs/${key}/Zh.vue')},`)
  }
  docs.sort((pre, next) => pre.order - next.order)

  return { docs, routes }
}

interface DemoMap {
  components: Record<string, { language: DocsLanguage; children: DemoItem[] }>
  cdk: (DemoItem & DocsItem)[]
}

interface DemoItem {
  path: string
  title: string
  subtitle: string
  description: string
  cover: string
}

function handleDemoMeta(docsMetaMap: Record<string, Record<string, Meta>>) {
  const demoMap: DemoMap = { components: {}, cdk: [] } as DemoMap
  const routes: string[] = []
  Object.keys(docsMetaMap).forEach(packageName => {
    Object.keys(docsMetaMap[packageName]).forEach(componentName => {
      generateLanguageData(docsMetaMap[packageName][componentName], packageName, componentName, 'zh', demoMap)
      routes.push(
        `{path: '/${packageName}/${componentName}/zh', 'component': () => import('./${packageName}/${componentName}/Zh.vue')},`,
      )
    })
  })

  return { demoMap, routes }
}

function generateLanguageData(
  itemData: Meta,
  packageName: string,
  componentName: string,
  language: DocsLanguage,
  demoMap: DemoMap,
) {
  const { category, type, title, subtitle = '', description, cover, order } = itemData[language]
  const path = `/${packageName}/${componentName}/${language}`

  if (category === 'components') {
    const item = { path, title, subtitle, description, cover }
    if (!demoMap['components'][type]) {
      demoMap['components'][type] = { children: [item], language }
    } else {
      demoMap['components'][type].children.push(item)
    }
  } else if (category === 'cdk') {
    const item = { path, title, subtitle, description, cover, language, order }
    demoMap['cdk'].push(item)
  }
}
