/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type MaybeElementRef, convertElement } from '@idux/cdk/utils'

import { type DnDContext } from './useDragDropContext'

export function useDragFree(target: MaybeElementRef, context: DnDContext): void {
  const sourceElement = convertElement(target)!

  context.registry.on(sourceElement, 'source', 'dragend', (evt: DragEvent) => {
    const diffOffset = context.state.currPosition.value

    if (evt.dataTransfer) {
      // only available in draggable section
      if (evt.dataTransfer.dropEffect !== 'none') {
        sourceElement!.style.transform = `translate(${diffOffset.offsetX}px,${diffOffset.offsetY}px)`
      }
    }
  })
}
