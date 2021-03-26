/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readFileSync } from 'fs-extra'
import remark from 'remark'
import { dirname, join } from 'path'
import { loadFront } from 'yaml-front-matter'

import marked from './marked'
import { nonBindAble, withoutSuffix } from './utils'
import { getDemoTemplate } from './template'

const _remark = remark()
export function parsePackageDemo(id: string, raw: string): string {
  const [filename, , componentName, packageName] = id.split('/').reverse()
  const demoName = withoutSuffix(filename)
  const { __content: content, title } = loadFront(raw)

  const { zhDescription, enDescription, code } = parseContent(id, content, demoName)

  return getDemoTemplate({
    packageName,
    componentName,
    demoName,
    zhTitle: title.zh,
    enTitle: title.en,
    zhDescription,
    enDescription,
    code,
  })
}

function parseContent(id: string, content: string, demoName: string) {
  const ast = _remark.parse(content)

  let flag = 'zh' // 0 zh, 1 en
  let zh = ''
  let en = ''

  ast.children.forEach(item => {
    const { type, depth, children } = item
    if (type === 'heading' && depth === 2) {
      const type = children[0].value
      if (type === 'en') {
        flag = 'en'
      }
      return
    }

    if (flag === 'en') {
      en += marked(_remark.stringify(item as any))
    } else {
      zh += marked(_remark.stringify(item as any))
    }
  })

  let code = ''

  const vueFilename = demoName + '.vue'
  const vueFilepath = join(dirname(id), vueFilename)
  if (existsSync(vueFilepath)) {
    code = marked(_remark.stringify({ type: 'code', lang: 'html', value: readFileSync(vueFilepath, 'utf-8') }))
  } else {
    console.warn(`The demo source file ${vueFilepath} not exist`)
  }

  return { zhDescription: nonBindAble(zh), enDescription: nonBindAble(en), code }
}
