/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DnDContext } from './useDragDropContext'

import { MaybeElementRef, convertElement } from '@idux/cdk/utils'

export const withDragHandle = (source: MaybeElementRef, handle: MaybeElementRef, context: DnDContext): void => {
  let dragTarget: HTMLElement | null = null
  const sourceEl = convertElement(source)!
  const handleEl = convertElement(handle)!

  handleEl.classList?.add('cdk-draggable-handler')

  context.registry.on(sourceEl, 'source', 'pointerdown', e => {
    dragTarget = e.target as HTMLElement
  })

  context.registry.on(sourceEl, 'source', 'pointerup', _ => {
    dragTarget = null
  })

  context.registry.on(sourceEl, 'source', 'dragstart', e => {
    if (!handleEl.contains(dragTarget)) {
      e.preventDefault()
    }
  })
}
