import { ComputedRef, InjectionKey, Slots, WritableComputedRef } from 'vue'
import { CollapseProps } from './types'

export interface CollapseContext {
  props: CollapseProps
  slots: Slots
  expandedKeys: WritableComputedRef<(string | number)[]>
  expandIcon: ComputedRef<string>
  handleExpand: (key: string | number) => void
}

export const collapseToken: InjectionKey<CollapseContext> = Symbol('collapseToken')
