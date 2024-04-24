/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ContainerType, DynamicCssOptions } from '../types'

import { isBrowser } from '@idux/cdk/platform'

const IDUX_THEME_KEY = 'idux-theme-key'
const IDUX_THEME_REF_CNT_KEY = '__IDUX_THEME_REF_CNT__'

function findStyles(container: ContainerType): HTMLStyleElement[] {
  return Array.from(container.children).filter(node => node.tagName === 'STYLE') as HTMLStyleElement[]
}

function getContainer(option: DynamicCssOptions): ContainerType {
  if (option.attachTo) {
    return option.attachTo
  }

  const head = document.querySelector('head')
  return head || document.body
}

export function findExistNode(key: string, option: DynamicCssOptions = {}): HTMLStyleElement | undefined {
  const container = getContainer(option)

  return findStyles(container).find(node => node.getAttribute(IDUX_THEME_KEY) === key)
}

export function getStyleRefCnt(node: HTMLStyleElement): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (node as any)[IDUX_THEME_REF_CNT_KEY] ?? 0
}

export function setStyleRefCnt(node: HTMLStyleElement, cnt: number): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(node as any)[IDUX_THEME_REF_CNT_KEY] = cnt
}

export function injectCSS(css: string, option: DynamicCssOptions = {}): HTMLStyleElement | null {
  if (!isBrowser) {
    return null
  }

  const { csp } = option

  const styleNode = document.createElement('style')

  if (csp?.nonce) {
    styleNode.nonce = csp?.nonce
  }
  styleNode.innerHTML = css

  const container = getContainer(option)

  container.appendChild(styleNode)

  return styleNode
}

export function removeCSS(key: string, option: DynamicCssOptions = {}): void {
  const existNode = findExistNode(key, option)
  if (existNode) {
    const container = getContainer(option)
    container.removeChild(existNode)
  }
}

export function updateCSS(css: string, key: string, option: DynamicCssOptions = {}): HTMLStyleElement | null {
  const existNode = findExistNode(key, option)

  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css
    }

    return existNode
  }

  const newNode = injectCSS(css, option)
  newNode?.setAttribute(IDUX_THEME_KEY, key)
  return newNode
}
