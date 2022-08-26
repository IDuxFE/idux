/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { isFunction } from 'lodash-es'

import { type MaybeElement } from '@idux/cdk/utils'

import { type ClickOutsideBinding, ClickOutsideDirective } from './types'
import { useClickOutside } from './useClickOutside'

const stopHandleMap = new Map<MaybeElement, () => void>()

const createClickOutside = (el: MaybeElement, binding: ClickOutsideBinding) => {
  let stop = stopHandleMap.get(el)
  if (stop) {
    stop()
  }

  if (!binding) {
    return
  }

  if (isFunction(binding)) {
    stop = useClickOutside(el, binding)
  } else {
    const { handler, ...options } = binding
    stop = useClickOutside(el, handler, options)
  }
  stopHandleMap.set(el, stop)
}

export const vClickOutside: ClickOutsideDirective = {
  mounted(el, binding) {
    createClickOutside(el, binding.value)
  },
  updated(el, binding) {
    createClickOutside(el, binding.value)
  },
  unmounted(el) {
    const stop = stopHandleMap.get(el)
    if (stop) {
      stop()
    }
    stopHandleMap.delete(el)
  },
}

/**
 * @deprecated please use `vClickOutside` instead'
 */
export const clickOutside = vClickOutside
