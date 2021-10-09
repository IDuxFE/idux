/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GetKey } from './composables/useGetKey'
import type { ScrollContext } from './composables/useScroll'
import type { VirtualScrollProps } from './types'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface VirtualScrollContext extends ScrollContext {
  props: VirtualScrollProps
  slots: Slots
  holderRef: Ref<HTMLElement | undefined>
  fillerRef: Ref<HTMLElement | undefined>
  useVirtual: ComputedRef<boolean>
  getKey: ComputedRef<GetKey>
  collectHeights: () => void
}

export const virtualScrollToken: InjectionKey<VirtualScrollContext> = Symbol('virtualScrollToken')
