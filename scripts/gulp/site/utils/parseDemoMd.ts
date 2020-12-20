/* eslint-disable @typescript-eslint/no-explicit-any */
import { existsSync, readFileSync } from 'fs-extra'
import remark from 'remark'
import { loadFront } from 'yaml-front-matter'
import { Log } from '../../../utils/log'
import marked from './marked'
import { nonBindAble } from './tools'
import { AstNode, DemoInfo } from './types'

export function parseDemoMd(file: Buffer, demoStandAloneFile: string): Omit<DemoInfo, 'codeBox'> {
  // 获取meta信息
  const { __content: content, ...meta } = loadFront(file)

  const _remark = remark()
  const ast = (_remark.parse(content) as unknown) as AstNode
  let rawCode = ''
  let zhPart = ''
  let highlightCode = ''
  let isDemo = false

  ast.children.forEach(item => {
    const { type, depth, children } = item
    if (type === 'heading' && depth === 2) {
      if (children[0].value === 'demo') {
        isDemo = true
      }
      return
    }

    if (isDemo) {
      rawCode = item.value
      highlightCode = marked(_remark.stringify(item as any))
      isDemo = false
    } else {
      zhPart += marked(_remark.stringify(item as any))
    }
  })

  if (!rawCode && !highlightCode) {
    if (existsSync(demoStandAloneFile)) {
      rawCode = readFileSync(demoStandAloneFile, 'utf-8')
      const highlightItem = {
        type: 'code',
        lang: 'html',
        meta: null,
        value: rawCode,
      }
      highlightCode = marked(_remark.stringify(highlightItem))
    } else {
      Log.warn(`The demo source file ${demoStandAloneFile} not exist`)
    }
  }

  return {
    meta,
    rawCode,
    highlightCode,
    zh: nonBindAble(zhPart),
  }
}
