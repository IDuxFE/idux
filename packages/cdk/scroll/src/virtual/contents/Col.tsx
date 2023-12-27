/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualColRenderFn, VirtualScrollRowData } from '../types'
import type { FunctionalComponent } from 'vue'

import { getFirstValidNode, useKey } from '@idux/cdk/utils'

const Col: FunctionalComponent<{
  row: VirtualScrollRowData
  rowIndex: number
  item: unknown
  index: number
}> = (props, { slots }) => {
  const key = useKey()
  const { row, rowIndex, item, index } = props
  const render = slots.default as VirtualColRenderFn

  const nodes = render({ row, rowIndex, item, index })

  const node = getFirstValidNode(nodes)

  if (node) {
    node.key = key
  }

  return node
}

export default Col
