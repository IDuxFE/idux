/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentFragment, parseFragment } from 'parse5'
import { loadFront } from 'yaml-front-matter'
import marked from './marked'

function findNodeByName(fragment: any, name: string, result: DocumentFragment[] = []) {
  if (fragment.nodeName === name) {
    result.push(fragment)
  }

  if (fragment.childNodes) {
    for (const childNode of fragment.childNodes) {
      findNodeByName(childNode, name, result)
    }
  }
}

export function getMeta(
  file: Buffer,
): {
  readonly [key: string]: any
  readonly __content: string
} {
  const meta = loadFront(file)
  const content = marked(meta.__content)
  const fragment = parseFragment(content)
  const paragraphs: DocumentFragment[] = []
  findNodeByName(fragment, 'p', paragraphs)
  const contents = paragraphs
    .map(f => {
      const c: DocumentFragment[] = []
      findNodeByName(f, '#text', c)
      return c
    })
    .reduce((a, b) => [...a, ...b], [])
  let description = ''
  for (const item of contents) {
    if (description.length >= 160) {
      break
    }
    description = description + (item as any).value
  }
  ;(meta as any).description = description
  return meta
}
