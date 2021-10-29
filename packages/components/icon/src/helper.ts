/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IconDefinition } from './types'

import { convertArray } from '@idux/cdk/utils'

import { createScriptElements, iconDefinitions } from './utils'

export const addIconDefinitions = (icons: IconDefinition[]): void => {
  icons.forEach(icon => iconDefinitions.set(icon.name, icon))
}

export const fetchIconFormScript = (url: string | string[]): void => {
  createScriptElements(convertArray(url))
}
