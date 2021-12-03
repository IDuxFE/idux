/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isFunction, isString } from 'lodash-es'

import { Logger } from '@idux/cdk/utils'

export function covertTarget(
  target: string | HTMLElement | (() => string | HTMLElement) | undefined,
): HTMLElement | Window {
  const temp = isFunction(target) ? target() : target
  if (isString(temp)) {
    const targetDom = document.querySelector<HTMLElement>(temp)
    if (targetDom) {
      return targetDom
    } else {
      __DEV__ &&
        Logger.warn('components/utils', `target does not exist: ${target}, default value are already used: window.`)
      return window
    }
  }

  return temp || window
}
