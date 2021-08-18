import type { VNodeTypes, VNode } from 'vue'

import { isString } from 'lodash-es'
import { getFirstValidNode } from '@idux/cdk/utils'

export function getColTitle(
  children: VNodeTypes,
  title: string | undefined,
  ellipsis: boolean | undefined,
): string | undefined {
  let _title: string | undefined = undefined
  if (ellipsis) {
    if (isString(children)) {
      _title = children
    } else {
      const node = getFirstValidNode(children as VNode)
      if (node && isString(node.children)) {
        _title = node.children
      } else {
        _title = title
      }
    }
  }
  return _title
}
