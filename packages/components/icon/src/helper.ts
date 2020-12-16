import type { IconDefinition } from './types'
import { iconDefinitions, createScriptElements } from './utils'

export const addIconDefinitions = (icons: IconDefinition[]): void => {
  icons.forEach(icon => iconDefinitions.set(icon.name, icon))
}

export const fetchFromIconfont = (iconFontUrl: string | string[]): void => {
  const urls = Array.isArray(iconFontUrl) ? iconFontUrl : [iconFontUrl]
  createScriptElements(urls)
}
