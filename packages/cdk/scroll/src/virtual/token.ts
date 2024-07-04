/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { Scroll, SyncScroll } from './composables/useScrollPlacement'
import type { VirtualScrollEnabled, VirtualScrollProps } from './types'
import type { VKey } from '@idux/cdk/utils'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface VirtualScrollContext {
  props: VirtualScrollProps
  slots: Slots
  containerSize: ComputedRef<{
    width: number
    height: number
  }>
  enabled: ComputedRef<VirtualScrollEnabled>
  holderRef: Ref<HTMLElement | undefined>
  fillerHorizontalRef: Ref<HTMLElement | undefined>
  fillerVerticalRef: Ref<HTMLElement | undefined>
  useVirtual: ComputedRef<boolean>
  collectSize: () => void
  getRowHeight: (rowKey: VKey) => number
  getColWidth: (rowKey: VKey, colKey: VKey) => number
  scroll: Ref<Scroll>
  scrollHeight: Ref<number>
  scrollWidth: Ref<number>
  scrollOffsetTop: Ref<number | undefined>
  scrollOffsetLeft: Ref<number | undefined>
  prependedRowKeys: Ref<VKey[]>
  prependedColKeys: Ref<Map<VKey, VKey[]>>
  syncScroll: SyncScroll
  handleScroll: (evt: Event) => void
  topIndex: Ref<number>
  bottomIndex: Ref<number>
  leftIndex: Ref<number[]>
  rightIndex: Ref<number[]>
  renderedData: ComputedRef<unknown[]>
}

export const virtualScrollToken: InjectionKey<VirtualScrollContext> = Symbol('virtualScrollToken')
