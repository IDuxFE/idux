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

function getValidNode(node: VNode, depth: number): VNode | undefined {
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
  return (convertArray(nodes) as VNode[]).find(node => getValidNode(node, maxDepth))
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

export function isEmptyNode(nodes: VNodeChild): boolean {
  return convertArray(nodes).every(
    node =>
      !node ||
      isComment(node) ||
      (isFragment(node) && (node as any).children.length === 0) ||
      (isText(node) && (node as any).children.trim() === ''),
  )
}

export function flattenNode(
  nodes: VNodeChild,
  filterOptions: { empty?: boolean; key?: string | symbol | Array<string | symbol> } = {},
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
