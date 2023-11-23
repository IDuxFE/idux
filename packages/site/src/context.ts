import { ComputedRef, InjectionKey, Ref } from 'vue'

import { BreakpointKey } from '@idux/cdk/breakpoint'

export const isDevMode = process.env.NODE_ENV !== 'production'

export type AppTheme = 'seer' | 'default'

export interface AppContext {
  org: string
  repo: string
  lang: Ref<'zh' | 'en'>
  path: ComputedRef<string>
  page: ComputedRef<string>
  breakpoints: Record<BreakpointKey, boolean>
  theme: ComputedRef<AppTheme>
  setTheme: (theme: AppTheme) => void
}

export const appContextToken: InjectionKey<AppContext> = Symbol('appContextToken')
