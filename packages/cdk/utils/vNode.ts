import type { VNode, VNodeChild } from 'vue'

import { Comment, Fragment, Slots } from 'vue'

import { isUndefined } from './typeof'

const TEMPLATE = 'template'

export const isFragment = (node: VNodeChild): boolean => (node as VNode).type === Fragment
export const isComment = (node: VNodeChild): boolean => (node as VNode).type === Comment
export const isTemplate = (node: VNodeChild): boolean => (node as VNode).type === TEMPLATE

function getChildren(node: VNode, depth: number): undefined | VNode {
  if (isComment(node)) return
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
export function getFirstValidNode(nodes?: VNodeChild, maxDepth = 3): ReturnType<typeof getChildren> {
  if (isUndefined(nodes)) return
  if (Array.isArray(nodes)) {
    return getChildren(nodes[0] as VNode, maxDepth)
  }
  return getChildren(nodes as VNode, maxDepth)
}

/**
 * determine whether an element is valid (not fragment not comment)
 * @param node node to be determined
 */
export function isValidElementNode(node: VNodeChild): boolean {
  return !(isFragment(node) || isComment(node))
}

/**
 * get all child node (Whatever dynamic or not)
 * @param slots slots of the component
 * @param key key of slots, default is 'default'
 * @param options the property of the render function
 */
export function getSlotNodes(slots: Slots, key = 'default', options: unknown[] = []): VNode[] {
  if (!slots[key]) return []

  let vNodes = slots[key]!(options)
  if (vNodes.length === 1 && isFragment(vNodes[0])) {
    vNodes = vNodes[0].dynamicChildren ?? []
  }

  return vNodes
}
