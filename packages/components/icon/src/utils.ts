/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconDefinition } from './types'
import type { VNode, VNodeChild } from 'vue'

import { cloneVNode } from 'vue'

import { Logger, getFirstValidNode } from '@idux/cdk/utils'

export const iconDefinitions = new Map<string, IconDefinition>()

const iconCache = new Map<string, SVGElement | Promise<SVGElement | null>>()
const scriptCache = new Set<string>()

export function clearSVGElement(el: HTMLElement): void {
  const children = el.childNodes
  const length = children.length
  for (let i = length - 1; i >= 0; i--) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const child = children[i] as any
    if (child.tagName?.toLowerCase() === 'svg') {
      child.remove()
    }
  }
}

export async function loadSVGElement(
  iconName: string,
  loadIconDynamically?: (iconName: string) => Promise<string>,
): Promise<SVGElement | null> {
  const cached = iconCache.get(iconName)
  if (cached) {
    const svg = await cached
    if (svg) {
      return svg.cloneNode(true) as SVGElement
    } else {
      iconCache.delete(iconName)
      return null
    }
  }
  const svg = createSVGElement(iconName, loadIconDynamically)
  iconCache.set(iconName, svg)
  return svg
}

export async function loadSvgElementFormScript(iconName: string): Promise<SVGElement | null> {
  let svg: SVGElement | null = null
  const cachedName = `IDUX_CACHED_ICON_FONT_` + iconName
  const cached = iconCache.get(cachedName)
  if (cached) {
    svg = await cached
  }
  if (!svg) {
    svg = covertSVGElement(`<svg><use xlink:href="#${iconName}"></svg>`)!
    setSVGAttribute(svg, iconName)
    iconCache.set(cachedName, svg)
  }

  return svg.cloneNode(true) as SVGElement
}

async function createSVGElement(
  iconName: string,
  loadIconDynamically: ((iconName: string) => Promise<string>) | undefined,
) {
  let svg: SVGElement | null = null
  const icon = await loadIconDefinition(iconName, loadIconDynamically)
  if (icon) {
    svg = covertSVGElement(icon.svg)
    if (svg) {
      setSVGAttribute(svg, iconName)
      iconCache.set(iconName, svg)
    } else {
      __DEV__ && Logger.warn('components/icon', `The icon [${iconName}] create failed.`)
    }
  }
  return svg
}

async function loadIconDefinition(iconName: string, loadIconDynamically?: (iconName: string) => Promise<string>) {
  let icon = iconDefinitions.get(iconName)

  if (!icon) {
    if (loadIconDynamically) {
      const svg = await loadIconDynamically(iconName)
      if (validSVGString(svg)) {
        icon = { name: iconName, svg }
        iconDefinitions.set(iconName, icon)
      } else {
        __DEV__ && Logger.warn('components/icon', `The dynamically loaded icon [${iconName}] is invalid.`)
        return
      }
    } else {
      __DEV__ && Logger.warn('components/icon', `The icon [${iconName}] load failed.`)
    }
  }

  return icon
}

function validSVGString(svg: string): boolean {
  return !!svg && svg.includes('<svg')
}

function covertSVGElement(svg: string): SVGElement | null {
  const div = document.createElement('div')
  div.innerHTML = svg
  return div.querySelector('svg')
}

const defaultSVGAttributes = {
  viewBox: '0 0 1024 1024',
  width: '1em',
  height: '1em',
  focusable: 'false',
  fill: 'currentColor',
  'aria-hidden': 'true',
}

function setSVGAttribute(svg: SVGElement, iconName: string): void {
  Object.entries(defaultSVGAttributes).forEach(([key, value]) => {
    if (!svg.hasAttribute(key)) {
      svg.setAttribute(key, value)
    }
  })
  svg.setAttribute('data-icon', iconName)
}

export function covertSVGNode(child: VNodeChild | undefined): VNode | undefined {
  const node = getFirstValidNode(child)
  if (!node || node.type !== 'svg') {
    Logger.warn('components/icon', 'The children must is svg element')
    return
  }
  return cloneVNode(node, { ...defaultSVGAttributes, ...node.props })
}

export function createScriptElements(urls: string[], index = 0): void {
  const currentUrl = urls[index]
  if (!scriptCache.has(currentUrl)) {
    const scriptElement = document.createElement('script')
    scriptElement.setAttribute('src', currentUrl)
    if (urls.length > index + 1) {
      scriptElement.onload = () => createScriptElements(urls, index + 1)
      scriptElement.onerror = () => {
        Logger.error('components/icon', `The url ${currentUrl} failed to load`)
        createScriptElements(urls, index + 1)
      }
    }
    scriptCache.add(currentUrl)
    document.body.appendChild(scriptElement)
  }
}
