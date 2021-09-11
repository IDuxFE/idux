import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'
import type { GetKey } from './composables/useGetKey'
import type { ScrollContext } from './composables/useScroll'
import type { VirtualScrollProps } from './types'

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
