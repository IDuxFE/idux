/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type VNode, type VNodeChild } from 'vue'

import { isString } from 'lodash-es'

import { getFirstValidNode } from '@idux/cdk/utils'

export function getColTitle(
  ellipsis: boolean | undefined,
  children: VNodeChild,
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
