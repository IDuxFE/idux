/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VirtualRowRenderFn } from '../types'
import type { FunctionalComponent, VNode } from 'vue'

import { getFirstValidNode, useKey } from '@idux/cdk/utils'

const Row: FunctionalComponent<{
  item: unknown
  index: number
  children?: VNode[]
}> = (props, { slots }) => {
  const key = useKey()
  const { item, index, children } = props
  const render = slots.default as VirtualRowRenderFn

  const nodes = render({ item, index, children })

  const node = getFirstValidNode(nodes)

  if (node) {
    node.key = key
  }

  return node
}

export default Row
