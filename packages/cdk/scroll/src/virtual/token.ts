/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SyncScrollTop } from './composables/useScrollPlacement'
import type { VirtualScrollProps } from './types'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface VirtualScrollContext {
  props: VirtualScrollProps
  slots: Slots
  holderRef: Ref<HTMLElement | undefined>
  fillerRef: Ref<HTMLElement | undefined>
  useVirtual: ComputedRef<boolean>
  collectHeights: () => void
  scrollTop: Ref<number>
  scrollHeight: Ref<number>
  scrollOffset: Ref<number | undefined>
  syncScrollTop: SyncScrollTop
  handleScroll: (evt: Event) => void
}

export const virtualScrollToken: InjectionKey<VirtualScrollContext> = Symbol('virtualScrollToken')
