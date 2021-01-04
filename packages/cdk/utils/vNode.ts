import type { VNode, VNodeChild } from 'vue'

import { Comment, Fragment } from 'vue'

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
 * @param nodes {VNode} node to be searched
 * @param maxDepth {number} depth to be searched, default is 3
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
 * @param node {VNode} node to be determined
 * @returns {boolean}
 */
export function isValidElementNode(node: VNodeChild): boolean {
  return !(isFragment(node) || isComment(node))
}
