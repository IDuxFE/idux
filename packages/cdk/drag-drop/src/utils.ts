/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

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
    const _window = window as unknown as HTMLElement
    if (!_dnDContextMap.has(_window)) {
      context = useDnDContext(_window)
      _dnDContextMap.set(_window, context)
    } else {
      context = _dnDContextMap.get(_window)!
    }
    return context
  }
  return targetContext
}
