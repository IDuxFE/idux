/* eslint-disable @typescript-eslint/no-explicit-any */
import remark from 'remark'
import { loadFront } from 'yaml-front-matter'
import marked from './marked'
import { nonBindAble } from './tools'
import { AstNode, DemoInfo } from './types'

export function parseDemoMd(file: Buffer): Omit<DemoInfo, 'codeBox'> {
  // 获取meta信息
  const { __content: content, ...meta } = loadFront(file)

  const _remark = remark()
  const ast = (_remark.parse(content) as unknown) as AstNode
  let rawCode = ''
  let zhPart = ''
  let highlightCode = ''
  ast.children.forEach(item => {
    const type = item.type
    if (type === 'code') {
      rawCode = item.value
      highlightCode += marked(_remark.stringify(item as any))
    } else if (type === 'paragraph') {
      zhPart += marked(_remark.stringify(item as any))
    }
  })

  return {
    meta,
    rawCode,
    highlightCode,
    zh: nonBindAble(zhPart),
  }
}
