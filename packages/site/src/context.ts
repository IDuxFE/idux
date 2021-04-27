import { InjectionKey, Ref } from 'vue'

export const isDevMode = process.env.NODE_ENV !== 'production'

export interface AppContext {
  org: string
  repo: string
  lang: Ref<'zh' | 'en'>
  path: Ref<string>
  page: Ref<string>
}

export const appContextToken: InjectionKey<AppContext> = Symbol('appContextToken')
