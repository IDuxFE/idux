/* eslint-disable @typescript-eslint/no-explicit-any */
import remark from 'remark'
import { getMeta } from './getMeta'
import marked from './marked'
import { nonBindAble } from './tools'
import { AstNode, DocsInfo } from './types'

export function parseDocsMd(file: Buffer): Omit<DocsInfo, 'path'> {
  // 获取meta信息
  const { __content: content, ...meta } = getMeta(file)
  const _remark = remark()
  const ast = (_remark.parse(content) as unknown) as AstNode

  // 分离前后两部分
  let isAfterAPIHeading = false

  let firstPart = ''
  let secondPart = ''

  ast.children.forEach(item => {
    const { type, depth } = item
    if (type === 'heading' && depth === 2 && item.children[0].value === 'API') {
      isAfterAPIHeading = true
    }
    if (!isAfterAPIHeading) {
      firstPart += marked(_remark.stringify(item as any))
    } else {
      secondPart += marked(_remark.stringify(item as any))
    }
  })

  return {
    meta,
    whenToUse: nonBindAble(firstPart),
    api: nonBindAble(secondPart),
  }
}
