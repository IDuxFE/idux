/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DndSortableContext } from '../composables/useDndSortable'
import type { DndSortableReorderEffect, DndSortableStrategy } from '../types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey } from 'vue'

interface DndSortableCompContext extends DndSortableContext {
  lastMovedKey: ComputedRef<VKey | undefined>
  mergedStrategy: ComputedRef<DndSortableStrategy>
  mergedEffect: ComputedRef<DndSortableReorderEffect>
}

interface DndSortableItemContext {
  setDragHandle: (dragHandle: HTMLElement | undefined) => void
}

interface PublicDndSortableContext extends Pick<DndSortableContext, 'draggingOverState' | 'draggingState'> {}

export const dndSortableToken: InjectionKey<DndSortableCompContext> = Symbol('dndSortableToken')
export const dndSortableItemToken: InjectionKey<DndSortableItemContext> = Symbol('dndSortableItemToken')

// public token
export const CDK_DND_SORTABLE_TOKEN: InjectionKey<PublicDndSortableContext> = Symbol('CDK_DND_SORTABLE_TOKEN')
