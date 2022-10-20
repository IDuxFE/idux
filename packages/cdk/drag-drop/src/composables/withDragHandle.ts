/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDContext } from './useDragDropContext'

import { DnDEventType } from '../types'

export const withDragHandle = (sourceEl: HTMLElement, handleEl: HTMLElement, context: DnDContext): void => {
  const registry = context.registry
  const state = registry.state(sourceEl)!

  handleEl.classList.add('cdk-draggable-handle')

  const preventNotHandle = (target: HTMLElement, e: DnDEventType) => {
    if (!handleEl.contains(target)) {
      e.preventDefault()
      state.end()
    }
  }

  if (state.isNative) {
    let dragTarget: HTMLElement | null = null

    registry.on(sourceEl, 'pointerdown', e => {
      dragTarget = e.target as HTMLElement
    })

    registry.on(sourceEl, 'pointerup', _ => {
      dragTarget = null
    })

    registry.on(sourceEl, 'dragstart', e => preventNotHandle(dragTarget!, e))
  } else {
    registry.on(sourceEl, 'pointerdown', e => preventNotHandle(e.target as HTMLElement, e))
    registry.on(sourceEl, 'touchstart', e => preventNotHandle(e.target as HTMLElement, e))
  }
}
