import { ComputedRef, InjectionKey, Ref } from 'vue'

import { BreakpointKey } from '@idux/cdk/breakpoint'

export const isDevMode = process.env.NODE_ENV !== 'production'

export interface AppContext {
  org: string
  repo: string
  lang: Ref<'zh' | 'en'>
  path: ComputedRef<string>
  page: ComputedRef<string>
  breakpoints: Record<BreakpointKey, boolean>
}

export const appContextToken: InjectionKey<AppContext> = Symbol('appContextToken')
