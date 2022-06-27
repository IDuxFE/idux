/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { PortalTargetType } from './types'

import { isFunction, isString } from 'lodash-es'

function tryFindElement(selector: string) {
  const classSelector = `.${selector}`
  return document.querySelector<HTMLElement>(selector) ?? document.querySelector<HTMLElement>(classSelector)
}

export function convertTarget(target: PortalTargetType): HTMLElement {
  const temp = isFunction(target) ? target() : target

  if (!isString(temp)) {
    return temp
  }

  let element = tryFindElement(temp)
  if (!element) {
    element = document.createElement('div')
    element.classList.add(temp)
    document.body.appendChild(element)
  }

  return element
}
