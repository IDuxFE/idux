/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DnDContext } from './useDragDropContext'
import { LockAxisType } from '../types'

export const withBoundary = (
  sourceEl: HTMLElement,
  boundaryEl: HTMLElement,
  lockAxis?: LockAxisType,
  context?: DnDContext,
): void => {
  const registry = context!.registry
  const state = registry.state(sourceEl)!

  if (boundaryEl != null) {
    if (!state.isNative) {
      state.enableXYBoundary(sourceEl, boundaryEl, lockAxis)
    }
    context?.connect(boundaryEl, sourceEl)
  }
}
