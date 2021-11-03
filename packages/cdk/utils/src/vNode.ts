/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Comment, Fragment, Slots, Text, VNode, VNodeChild, isVNode } from 'vue'

import { isNil } from 'lodash-es'

import { convertArray } from './convert'

const TEMPLATE = 'template'

export const isComment = (node: VNodeChild): boolean => (node as VNode).type === Comment
export const isFragment = (node: VNodeChild): boolean => (node as VNode).type === Fragment
export const isTemplate = (node: VNodeChild): boolean => (node as VNode).type === TEMPLATE
export const isText = (node: VNodeChild): boolean => (node as VNode).type === Text

function getChildren(node: VNode, depth: number): VNode | undefined {
  if (isComment(node)) {
    return
  }
  if (isFragment(node) || isTemplate(node)) {
    return depth > 0 ? getFirstValidNode(node.children as VNodeChild, depth - 1) : undefined
  }
  return node
}

/**
 * get first valid child node (not fragment not comment)
 *
 * @param nodes node to be searched
 * @param maxDepth depth to be searched, default is 3
 */
export function getFirstValidNode(nodes: VNodeChild, maxDepth = 3): VNode | undefined {
  if (isNil(nodes) || (Array.isArray(nodes) && !nodes.length)) {
    return
  }
  if (Array.isArray(nodes) && nodes.length > 0) {
    return getChildren(nodes[0] as VNode, maxDepth)
  }
  return getChildren(nodes as VNode, maxDepth)
}

/**
 * get all child node (Whatever dynamic or not)
 *
 * @param slots slots of the component
 * @param key key of slots, default is 'default'
 * @param options the property of the render function
 */
export function getSlotNodes(slots: Slots, key = 'default', ...options: unknown[]): VNode[] {
  const slot = slots[key]
  if (!slot) {
    return []
  }

  let vNodes = slot(...options)
  if (vNodes.length === 1 && isFragment(vNodes[0])) {
    vNodes = (vNodes[0].children as VNode[]) ?? vNodes[0].dynamicChildren ?? []
  }

  return vNodes
}

/**
 * checks whether a slot exists
 *
 * @param slots slots of the component
 * @param key key of slots, default is 'default'
 */
export function hasSlot(slots: Slots, key = 'default'): boolean {
  return !isNil(slots[key])
}

export function isEmptyNode(node: VNodeChild): boolean {
  return (
    !node ||
    isComment(node) ||
    (isFragment(node) && (node as any).children.length === 0) ||
    (isText(node) && (node as any).children.trim() === '')
  )
}

export function filterEmptyNode(nodes: VNodeChild): VNode[] {
  if (isNil(nodes) || (Array.isArray(nodes) && !nodes.length)) {
    return []
  }

  const result: VNode[] = []

  convertArray(nodes).forEach(node => {
    if (Array.isArray(node)) {
      result.push(...(node as VNode[]))
    } else if (isFragment(node)) {
      result.push(...(node as any).children)
    } else {
      result.push(node as VNode)
    }
  })

  return result.filter(c => !isEmptyNode(c))
}

export function flattenNode(
  nodes: VNodeChild,
  filterOptions: { empty?: boolean; key?: string | string[] } = {},
): VNode[] {
  const result: VNode[] = []

  convertArray(nodes).forEach(node => {
    if (Array.isArray(node)) {
      result.push(...flattenNode(node, filterOptions))
    } else if (isFragment(node)) {
      result.push(...flattenNode((node as any).children, filterOptions))
    } else {
      const { empty = true, key } = filterOptions
      if (empty && isEmptyNode(node)) {
        return
      }
      const keys = convertArray(key)
      if (keys.length && isVNode(node) && !keys.some(key => (node.type as any)[key])) {
        return
      }
      result.push(node as unknown as VNode)
    }
  })

  return result
}
