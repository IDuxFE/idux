/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function nonBindAble(content: string): string {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;')
}

export function withoutSuffix(name: string): string {
  return name.split('.')[0]
}

import remark from 'remark'

const _remark = remark()

export function generateDocsToc(meta: any, content: string): string {
  if (meta.toc === false) {
    return ''
  }

  const ast = _remark.parse(content)
  let links = ''
  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth === 2) {
      const text = child.children[0].value
      const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g, '')
      links += `<IxAnchorLink href="#${lowerText}" title="${text}"></IxAnchorLink>`
    }
  })

  return `<IxAnchor class="toc-wrapper" affix offset="16" @click="goLink($event)">
  ${links}
</IxAnchor>`
}
