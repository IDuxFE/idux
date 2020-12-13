/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync, writeFileSync } from 'fs-extra'
import { join, resolve } from 'path'
import { DocsLanguage, Meta } from './types'

const templateRouter = readFileSync(resolve(__dirname, '../template/router.html'), { encoding: 'utf-8' })

function generateLanguageData(
  itemData: Meta,
  packageName: string,
  componentName: string,
  language: DocsLanguage,
  reverseMap: any,
) {
  const subtitle = itemData[language].subtitle || ''
  const title = itemData[language].title
  const type = itemData[language].type
  const cover = itemData[language].cover
  const experimental = itemData[language].experimental
  const description = itemData[language].description
  const content = {
    label: title,
    path: `${packageName}/${componentName}/${language}`,
    zh: subtitle,
    experimental: !!experimental,
    cover,
    description,
  }
  if (!reverseMap[type]) {
    reverseMap[type] = { list: [content], language }
  } else {
    reverseMap[type].list.push(content)
  }
}

function generateNav(docsMetaMap: Record<string, Record<string, Meta>>) {
  const reverseMap = {}
  const routes: string[] = []
  Object.keys(docsMetaMap).forEach(packageName => {
    Object.keys(docsMetaMap[packageName]).forEach(componentName => {
      generateLanguageData(docsMetaMap[packageName][componentName], packageName, componentName, 'zh', reverseMap)
      routes.push(
        `  {path: '/${packageName}/${componentName}/zh', 'component': () => import('./${packageName}/${componentName}/Zh-CN.vue')},`,
      )
    })
  })

  return { reverseMap, routes: routes.join('\n') }
}

export function generateRoutes(
  outputDirname: string,
  docsMetaMap: Record<string, Meta>,
  docsMeta: Record<string, Record<DocsLanguage, Meta>>,
): void {
  const intro = []
  const components = []
  for (const key in docsMeta) {
    const zhMeta = docsMeta[key]['zh']
    intro.push({
      path: `docs/${key}/zh`,
      label: zhMeta.title,
      language: 'zh',
      order: zhMeta.order,
      description: zhMeta.description,
      experimental: !!zhMeta.experimental,
    })
  }
  intro.sort((pre, next) => pre.order - next.order)
  writeFileSync(join(outputDirname, `intros.json`), JSON.stringify(intro, null, 2))
  const navData: any = generateNav(docsMetaMap)
  const routes = navData.routes
  for (const key in navData.reverseMap) {
    components.push({
      name: key,
      language: navData.reverseMap[key].language,
      children: navData.reverseMap[key].list.filter((item: { experimental: any }) => !item.experimental),
      experimentalChildren: navData.reverseMap[key].list.filter((item: { experimental: any }) => item.experimental),
    })
  }

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
    .replace(/{{intro}}/g, JSON.stringify(intro, null, 2))
    .replace(/{{components}}/g, JSON.stringify(components, null, 2))
    .replace(/{{routes}}/g, routes)
  writeFileSync(join(outputDirname, `router.ts`), fileContent)
}
