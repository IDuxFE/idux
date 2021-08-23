import type { InjectionKey, Ref, Slots } from 'vue'
import type { DrawerConfig } from '@idux/components/config'
import type { DrawerBindings, DrawerProps } from './types'

export interface DrawerContext {
  props: DrawerProps
  slots: Slots
  config: DrawerConfig
  visible: Ref<boolean>
  animatedVisible: Ref<boolean>
}

export const drawerToken: InjectionKey<DrawerContext> = Symbol('drawerToken')

// public token
export const DRAWER_TOKEN: InjectionKey<DrawerBindings & { props: DrawerProps }> = Symbol('DRAWER_TOKEN')
