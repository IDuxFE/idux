/* eslint-disable @typescript-eslint/no-explicit-any */
import { join } from 'path'

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs-extra'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { isString, kebabCase, lowerFirst } from 'lodash'
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
    const kebabCaseName = name === 'I18n' ? lowerFirst(name) : kebabCase(name)
    const path = `/${'docs'}/${kebabCaseName}/${lang}`
    docsMeta['docs'][name] = { ...meta, lang, path } as Meta
  })

  const filterPackageName = ['site']
  const filterComponentName = [
    '_private',
    'config',
    'locales',
    'node_modules',
    'style',
    `typography`,
    'utils',
    'version',
    ['pro', 'theme'],
  ]
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
      if (
        filterComponentName.some(filter =>
          isString(filter) ? componentName === filter : filter[0] === packageName && filter[1] === componentName,
        )
      ) {
        return
      }

      const componentDirname = join(packageDirname, componentName)
      if (statSync(join(componentDirname)).isDirectory() && readdirSync(componentDirname).length) {
        const componentDocsDirname = join(componentDirname, 'docs')
        readdirSync(componentDocsDirname).forEach(docs => {
          const [type, lang] = docs.split('.')
          if (type !== 'Index') {
            return
          }
          const { __content, ...meta } = loadFront(readFileSync(join(componentDocsDirname, docs)))
          const path = `/${packageName}/${componentName}/${lang}`
          docsMeta[packageName][componentName] = { ...meta, lang, path } as Meta
        })
      }
    })
  })

  const { docs, components, proComponents, cdk, routes } = handleDocsMeta(docsMeta)

  writeFileSync(join(sideNavFilename), getSideNavConfigTemplate(docs, components, proComponents, cdk))
  writeFileSync(join(routerFilename), getRoutesTemplate(routes))
}

interface DocsItem {
  path: string
  title: string
  subtitle?: string
  lang: string
  order: number
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

const defaultRoutes = [`{path: '/', 'component': () => import('./components/views/home/Home.vue')},`]

type ComponentsMap = Record<string, { lang: string; children: Omit<DocsItem, 'lang'>[] }>

function handleDocsMeta(docsMeta: Record<string, Record<string, Meta>>) {
  const docs: DocsItem[] = []
  const componentsMap: ComponentsMap = {}
  const proComponentsMap: ComponentsMap = {}
  const mapType: { [key: string]: ComponentsMap } = {
    components: componentsMap,
    pro: proComponentsMap,
  }
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
      } else if (['components', 'pro'].includes(category)) {
        const item = { path, title, subtitle, order }
        const cmpMap = mapType[category]
        if (!cmpMap[type]) {
          cmpMap[type] = { children: [item], lang }
        } else {
          cmpMap[type].children.push(item)
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

  const components = getComponentSort(componentsMap)
  const proComponents = getComponentSort(proComponentsMap)

  docs.sort((pre, next) => pre.order - next.order)
  components.sort((pre, next) => sortMap[pre.name] - sortMap[next.name])
  proComponents.sort((pre, next) => sortMap[pre.name] - sortMap[next.name])
  cdk.sort((pre, next) => pre.order - next.order)

  return { docs, components, proComponents, cdk, routes }
}

function getComponentSort(cmpMap: ComponentsMap) {
  const components: Array<{ name: string; lang: string; children: Omit<DocsItem, 'lang'>[] }> = []
  for (const name in cmpMap) {
    const { lang, children } = cmpMap[name]
    children.sort((pre, next) => pre.order - next.order)
    components.push({ name, lang, children })
  }
  return components
}

function getSideNavConfigTemplate(
  docs: DocsItem[],
  components: Array<{ name: string; lang: string; children: Omit<DocsItem, 'lang'>[] }>,
  proComponents: Array<{ name: string; lang: string; children: Omit<DocsItem, 'lang'>[] }>,
  cdk: DocsItem[],
): string {
  return `export const config = {
  docs: ${JSON.stringify(docs, null, 2)},
  components: ${JSON.stringify(components, null, 2)},
  pro: ${JSON.stringify(proComponents, null, 2)},
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
