/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { OriginScroll } from './composables/useOriginScroll'
import type { SyncScrollTop } from './composables/useScrollPlacement'
import type { ScrollVisibleContext } from './composables/useScrollVisible'
import type { VirtualScrollProps } from './types'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface VirtualScrollContext extends ScrollVisibleContext {
  props: VirtualScrollProps
  slots: Slots
  holderRef: Ref<HTMLElement | undefined>
  fillerRef: Ref<HTMLElement | undefined>
  useVirtual: ComputedRef<boolean>
  collectHeights: () => void
  scrollTop: Ref<number>
  scrollHeight: Ref<number>
  scrollOffset: Ref<number | undefined>
  scrollMoving: Ref<boolean>
  changeScrollMoving: (value: boolean) => void
  syncScrollTop: SyncScrollTop
  originScroll: OriginScroll
}

export const virtualScrollToken: InjectionKey<VirtualScrollContext> = Symbol('virtualScrollToken')
