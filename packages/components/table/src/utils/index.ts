import type { VNodeTypes, VNode } from 'vue'

import { isString } from 'lodash-es'
import { getFirstValidNode } from '@idux/cdk/utils'

export function getColTitle(
  ellipsis: boolean | undefined,
  children: VNodeTypes,
  title: string | undefined,
): string | undefined {
  if (!ellipsis) {
    return undefined
  }

  let _title = title
  if (isString(children)) {
    _title = children
  } else {
    const node = getFirstValidNode(children as VNode)
    if (node && isString(node.children)) {
      _title = node.children
    }
  }
  return _title
}
