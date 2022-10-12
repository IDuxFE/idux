/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDPosition } from './types'

import { createSharedComposable } from '@idux/cdk/utils'

import { type DnDContext, _dnDContextMap, useDragDropContext } from './composables/useDragDropContext'

const useDnDContext = createSharedComposable(useDragDropContext)

/**
 * get context
 *
 * @param targetContext
 */
export const initContext = (targetContext?: DnDContext): DnDContext => {
  let context = {} as DnDContext
  // default context is window
  if (!targetContext) {
    const root = document as unknown as HTMLElement
    if (!_dnDContextMap.has(root)) {
      context = useDnDContext(root)
      _dnDContextMap.set(root, context)
    } else {
      context = _dnDContextMap.get(root)!
    }
    return context
  }
  return targetContext
}

/**
 * move the element by using hardware accelerated css
 *
 * @param el
 * @param pos
 */
export const moveElement = (el: HTMLElement, pos: DnDPosition): void => {
  el.style.transform = `translate3d(${pos.x}px,${pos.y}px,0px)`
}

export const reMoveElement = (el: HTMLElement): void => {
  el.style.transform = ''
}

export const extraMove = (el: HTMLElement): DnDPosition => {
  const translate3d = el.style.transform.split('translate3d(')[1]
  const results = translate3d ? translate3d.split(',') : ['0', '0']

  return {
    x: parseFloat(results[0]) || 0,
    y: parseFloat(results[1]) || 0,
  }
}
