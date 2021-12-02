/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from './types'

import { isFunction, isString } from 'lodash-es'

const targetHashmap: Record<string, HTMLElement> = {}

export function useTarget(target: PortalTargetType): HTMLElement {
  const temp = isFunction(target) ? target() : target

  if (!isString(temp)) {
    return temp
  }

  if (targetHashmap[temp]) {
    return targetHashmap[temp]
  }

  const element = document.createElement('div')
  element.classList.add(temp)
  document.body.appendChild(element)
  targetHashmap[temp] = element

  return element
}
