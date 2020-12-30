/* eslint-disable @typescript-eslint/no-explicit-any */
import { copySync, existsSync, readdirSync, readFileSync, removeSync, statSync } from 'fs-extra'
import { join } from 'path'
import { generateCodeBox } from './utils/generateCodeBox'
import { generateDemo } from './utils/generateDemo'
import { generateDocs } from './utils/generateDocs'
import { generateRoutes } from './utils/generateRoutes'
import { getMeta } from './utils/getMeta'
import { parseDemoMd } from './utils/parseDemoMd'
import { parseDocsMd } from './utils/parseDocsMd'
import { buildConfig } from '../buildConfig'
import { withoutSuffix } from './utils/tools'
import { DemoInfo, DocsLanguage, Meta } from './utils/types'
import { upperFirst } from 'lodash'

const { siteDir, packageRoot, docsDir } = buildConfig
const siteOutputDirname = `${siteDir}/docs/src`

function initDir(target: string, targetName?: string): void {
  if (target === 'init') {
    copySync(join(__dirname, '_site'), `${siteDir}`)
  } else {
    removeSync(`${siteDir}/docs/src/${target}${targetName ? '/' + targetName : ''}`)
  }
}

export function generateSite(target: string, targetName?: string): void {
  initDir(target, targetName)

  const isSyncSpecific = target && target !== 'init'
  const demoMeta: Record<string, Record<string, Meta>> = {}

  const filterComponentName = ['style', 'core', 'locale', 'i18n', 'version', 'utils']
  readdirSync(packageRoot).forEach(packageName => {
    if (isSyncSpecific && packageName !== target) {
      return
    }
    demoMeta[packageName] = {}
    const packageDirname = join(packageRoot, packageName)
    readdirSync(packageDirname).forEach(componentName => {
      if (filterComponentName.includes(componentName) || (isSyncSpecific && componentName !== targetName)) {
        return
      }
      const componentDirname = join(packageDirname, componentName)
      if (statSync(componentDirname).isDirectory()) {
        const demoDirname = join(componentDirname, 'demo')
        const demoMap: Record<string, DemoInfo> = {}
        if (existsSync(demoDirname)) {
          readdirSync(demoDirname).forEach(demo => {
            if (/.md$/.test(demo)) {
              const demoKey = withoutSuffix(demo)
              const demoMarkDownFile = readFileSync(join(demoDirname, demo))
              const demoStandAloneFile = join(demoDirname, `${upperFirst(demoKey)}.vue`)
              const { meta, rawCode, highlightCode, zh: zhCn } = parseDemoMd(demoMarkDownFile, demoStandAloneFile)
              const zhCnCodeBox = generateCodeBox({
                title: meta?.title?.['zh'],
                packageName,
                componentName,
                demoKey,
                rawCode,
                highlightCode,
                docs: zhCn,
              })
              const codeBox = { zh: zhCnCodeBox }
              demoMap[demoKey] = { meta, rawCode, highlightCode, codeBox, zh: zhCn }
            }
          })
        }
        const docsZhInfo = parseDocsMd(readFileSync(join(componentDirname, 'docs/index.zh.md')))
        const docsZh = { ...docsZhInfo, path: `${packageName}/${componentName}/docs/index.zh.md` }
        const result = { packageName, componentName, zh: docsZh, demoMap }
        demoMeta[packageName][componentName] = { zh: result['zh'].meta }

        generateDemo(join(siteOutputDirname, packageName, componentName), result)
      }
    })
  })

  if (!isSyncSpecific) {
    initDocs(demoMeta)
  }
}

function initDocs(demoMeta: Record<string, Record<string, Meta>>): void {
  // read docs folder
  const docsMap: Record<string, Record<DocsLanguage, Buffer>> = {}
  const docsMeta: Record<string, Record<DocsLanguage, Meta>> = {}
  readdirSync(docsDir).forEach(doc => {
    const name = withoutSuffix(doc)
    docsMap[name] = {
      zh: readFileSync(join(docsDir, `${name}.zh.md`)),
    }
    docsMeta[name] = {
      zh: getMeta(docsMap[name]['zh']),
    }
  })

  generateDocs(siteOutputDirname, docsMap)
  generateRoutes(siteOutputDirname, docsMeta, demoMeta)
}
