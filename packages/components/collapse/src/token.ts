import { InjectionKey } from 'vue'
import { CollapseProps } from './types'

export interface CollapseContext {
  props: CollapseProps
  handleChange: (name: string) => void
}

export const collapseToken: InjectionKey<CollapseContext> = Symbol('collapseToken')
