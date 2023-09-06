/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { VNode } from 'vue'

import { isString } from 'lodash-es'

function getNodeLength(node: VNode): number {
  if (isString(node.children)) {
    return node.children.length
  }

  return 1
}

export function getNodesLength(nodes: VNode[] | undefined): number {
  if (!nodes) {
    return 0
  }

  let count = 0

  nodes.forEach(node => {
    count += getNodeLength(node)
  })

  return count
}

function sliceNode(node: VNode, start: number, end?: number): VNode {
  if (isString(node.children)) {
    return { ...node, children: node.children.slice(start, end) }
  }

  return node
}

export function sliceNodes(nodes: VNode[] | undefined, start: number, end: number): VNode[] | undefined {
  if (!nodes) {
    return
  }

  let currentIdx = 0
  let currentNodeIdx = 0
  const res: VNode[] = []

  while (currentIdx < end && currentNodeIdx < nodes.length) {
    const currentNode = nodes[currentNodeIdx]
    const nodeLen = getNodeLength(currentNode)

    if (currentIdx < start) {
      if (currentIdx + nodeLen > start) {
        res.push(sliceNode(currentNode, start - currentIdx))
      }
    } else if (currentIdx + nodeLen <= end) {
      res.push(currentNode)
    } else {
      res.push(sliceNode(currentNode, 0, end - currentIdx))
    }

    currentIdx += nodeLen
    currentNodeIdx++
  }

  return res
}
