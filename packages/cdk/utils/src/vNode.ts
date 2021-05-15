/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VNode, VNodeChild } from 'vue'

import { Comment, Fragment, Slots, Text } from 'vue'

import { isNil } from './typeof'

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
 * determine whether an element is valid (not fragment not comment)
 * @param node node to be determined
 */
export function isValidElementNode(node: VNodeChild): boolean {
  return !isNil(node) && !isFragment(node) && !isComment(node)
}

/**
 * get all child node (Whatever dynamic or not)
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
 * @param slots slots of the component
 * @param key key of slots, default is 'default'
 * @param options the property of the render function
 */
export function hasSlot(slots: Slots, key = 'default', ...options: unknown[]): boolean {
  const vNodes = slots[key]?.(...options)
  const firstValidNode = getFirstValidNode(vNodes)
  return isValidElementNode(firstValidNode)
}

export function isEmptyElement(node: VNodeChild): boolean {
  return (
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

  ;(nodes as VNode[]).forEach(node => {
    if (Array.isArray(node)) {
      result.push(...node)
    } else if (isFragment(node)) {
      result.push(...(node as any).children)
    } else {
      result.push(node)
    }
  })

  return result.filter(c => !isEmptyElement(c))
}
