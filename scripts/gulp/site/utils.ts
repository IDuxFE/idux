/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs-extra'
import { lowerFirst } from 'lodash'
import { join } from 'path'
import { loadFront } from 'yaml-front-matter'

import { gulpConfig } from '../gulpConfig'

const { packageRoot } = gulpConfig
const { docsDirname, sideNavFilename, routerFilename } = gulpConfig.site

export interface Meta {
  category: string
  type?: string
  title: string
  subtitle?: string
  lang: string
  path: string
  order?: number
}

export function initSite(): void {
  const docsMeta: Record<string, Record<string, Meta>> = { docs: {} }

  readdirSync(docsDirname).forEach(docs => {
    const { __content, ...meta } = loadFront(readFileSync(join(docsDirname, docs)))
    const [name, lang] = docs.split('.')
    const path = `/${'docs'}/${lowerFirst(name)}/${lang}`
    docsMeta['docs'][name] = { ...meta, lang, path } as Meta
  })

  const filterPackageName = ['site']
  const filterComponentName = ['node_modules', 'style', 'config', 'i18n', 'version', 'utils']
  readdirSync(packageRoot).forEach(packageName => {
    if (filterPackageName.includes(packageName)) {
      return
    }

    const packageDirname = join(packageRoot, packageName)
    if (!statSync(packageDirname).isDirectory()) {
      return
    }
    docsMeta[packageName] = {}
    readdirSync(packageDirname).forEach(componentName => {
      if (filterComponentName.includes(componentName)) {
        return
      }

      const componentDirname = join(packageDirname, componentName)
      if (statSync(join(componentDirname)).isDirectory() && readdirSync(componentDirname).length) {
        const componentDocsDirname = join(componentDirname, 'docs')
        readdirSync(componentDocsDirname).forEach(docs => {
          const { __content, ...meta } = loadFront(readFileSync(join(componentDocsDirname, docs)))
          const [, lang] = docs.split('.')
          const path = `/${packageName}/${componentName}/${lang}`
          docsMeta[packageName][componentName] = { ...meta, lang, path } as Meta
        })
      }
    })
  })

  const { docs, components, cdk, routes } = handleDocsMeta(docsMeta)

  writeFileSync(join(sideNavFilename), getSideNavConfigTemplate(docs, components, cdk))
  writeFileSync(join(routerFilename), getRoutesTemplate(routes))
}

interface DocsItem {
  path: string
  title: string
  subtitle?: string
  lang: string
  order: number
}

const componentsSortMap: Record<string, number> = {
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

const defaultRoutes = [`{path: '/', 'component': () => import('./home/Index.vue')},`]

function handleDocsMeta(docsMeta: Record<string, Record<string, Meta>>) {
  const docs: DocsItem[] = []
  const components: Array<{ name: string; lang: string; children: Omit<DocsItem, 'lang'>[] }> = []
  const componentsMap: Record<string, { lang: string; children: Omit<DocsItem, 'lang'>[] }> = {}
  const cdk: DocsItem[] = []
  const routes: string[] = defaultRoutes
  for (const packageName in docsMeta) {
    for (const componentName in docsMeta[packageName]) {
      const { category, type = '', title, subtitle = '', lang, path, order = 0 } = docsMeta[packageName][componentName]
      let mdPath = ''
      if (category === 'docs') {
        const item = { path, title, subtitle, lang, order }
        docs.push(item)
        mdPath = `./${packageName}/${componentName}.${lang}.md`
      } else if (category === 'components') {
        const item = { path, title, subtitle, order }
        if (!componentsMap[type]) {
          componentsMap[type] = { children: [item], lang }
        } else {
          componentsMap[type].children.push(item)
        }
        mdPath = `../../${packageName}/${componentName}/docs/Index.${lang}.md`
      } else if (category === 'cdk') {
        const item = { path, title, subtitle, lang, order }
        cdk.push(item)
        mdPath = `../../${packageName}/${componentName}/docs/Index.${lang}.md`
      }
      const route = `{path: '${path}', 'component': () => import('${mdPath}')},`
      routes.push(route)
    }
  }

  routes.push(`{path: '/:pathMatch(.*)*', redirect: '/'},`)

  for (const name in componentsMap) {
    const { lang, children } = componentsMap[name]
    children.sort((pre, next) => pre.order - next.order)
    components.push({ name, lang, children })
  }

  docs.sort((pre, next) => pre.order - next.order)
  components.sort((pre, next) => componentsSortMap[pre.name] - componentsSortMap[next.name])
  cdk.sort((pre, next) => pre.order - next.order)

  return { docs, components, cdk, routes }
}

function getSideNavConfigTemplate(
  docs: DocsItem[],
  components: Array<{ name: string; lang: string; children: Omit<DocsItem, 'lang'>[] }>,
  cdk: DocsItem[],
): string {
  return `export const config = {
  docs: ${JSON.stringify(docs, null, 2)},
  components: ${JSON.stringify(components, null, 2)},
  cdk: ${JSON.stringify(cdk, null, 2)}
};
`
}

function getRoutesTemplate(routes: string[]): string {
  return `import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
    ${routes.join('\n')}
];
`
}
