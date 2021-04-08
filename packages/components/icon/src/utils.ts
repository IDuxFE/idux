import type { IconDefinition, IconRendered } from './types'

import { Logger } from '@idux/cdk/utils'

export const iconDefinitions = new Map<string, IconDefinition>()
const iconRenderedCache = new Map<string, IconRendered>()
const iconfontCache = new Set<string>()

export const clearSVGElement = (el: HTMLElement): void => {
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

export const loadSVGElement = async (
  iconName: string,
  loadIconDynamically?: (iconName: string) => Promise<string>,
): Promise<SVGElement | null> => {
  const cached = iconRenderedCache.get(iconName)
  if (cached) {
    return cached.svg.cloneNode(true) as SVGElement
  }
  let svg: SVGElement | null = null
  const icon = await loadIconDefinition(iconName, loadIconDynamically)
  if (icon) {
    svg = createSVGElement(icon.svgString)
    if (svg) {
      setSVGAttribute(svg, iconName)
      iconRenderedCache.set(iconName, { name: iconName, svg })
    } else {
      Logger.error(`The icon [${iconName}] create failed.`)
    }
  }
  return svg
}

export const loadIconFontSvgElement = (iconName: string): SVGElement => {
  let svg: SVGElement | null
  const cached = iconRenderedCache.get('iconfont-' + iconName)
  if (cached) {
    svg = cached.svg
  } else {
    const svgString = `<svg><use xlink:href="#${iconName}"></svg>`
    svg = createSVGElement(svgString)!
    setSVGAttribute(svg, iconName)
    iconRenderedCache.set('iconfont-' + iconName, { name: iconName, svg })
  }

  return svg.cloneNode(true) as SVGElement
}

async function loadIconDefinition(iconName: string, loadIconDynamically?: (iconName: string) => Promise<string>) {
  let icon = iconDefinitions.get(iconName)

  if (!icon) {
    if (loadIconDynamically) {
      const svgString = await loadIconDynamically(iconName)
      if (validSVGString(svgString)) {
        icon = { name: iconName, svgString }
        iconDefinitions.set(iconName, icon)
      } else {
        return Logger.error(`The dynamically loaded icon [${iconName}] is invalid.`)
      }
    }
    if (!icon) {
      return Logger.error(`The icon [${iconName}] load failed.`)
    }
  }
  return icon
}

function validSVGString(svgString: string): boolean {
  return !!svgString && svgString.includes('<svg')
}

function createSVGElement(svgString: string): SVGElement | null {
  const div = document.createElement('div')
  div.innerHTML = svgString
  return div.querySelector('svg')
}

function setSVGAttribute(svg: SVGElement, iconName: string): void {
  svg.setAttribute('width', '1em')
  svg.setAttribute('height', '1em')
  svg.setAttribute('viewBox', '64 64 896 896')
  svg.setAttribute('focusable', 'false')
  svg.setAttribute('fill', 'currentColor')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('data-icon', iconName)
}

export function createScriptElements(urls: string[], index = 0): void {
  const currentUrl = urls[index]
  if (!iconfontCache.has(currentUrl)) {
    const scriptElement = document.createElement('script')
    scriptElement.setAttribute('src', currentUrl)
    if (urls.length > index + 1) {
      scriptElement.onload = () => createScriptElements(urls, index + 1)
      scriptElement.onerror = () => {
        Logger.error(`The url ${currentUrl} failed to load`)
        createScriptElements(urls, index + 1)
      }
    }
    iconfontCache.add(currentUrl)
    document.body.appendChild(scriptElement)
  }
}
