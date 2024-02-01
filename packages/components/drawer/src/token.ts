/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerBindings, DrawerProps, DrawerProviderRef } from './types'
import type { CommonConfig, DrawerConfig } from '@idux/components/config'
import type { ComputedRef, InjectionKey, Ref, Slots } from 'vue'

export interface DrawerContext {
  props: DrawerProps
  slots: Slots
  common: CommonConfig
  config: DrawerConfig
  mergedPrefixCls: ComputedRef<string>
  drawerElRef: Ref<HTMLElement | undefined>
  visible: Ref<boolean>
  delayedLoaded: Ref<boolean>
  animatedVisible: Ref<boolean>
  isAnimating: Ref<boolean>
  mergedVisible: ComputedRef<boolean>
  currentZIndex: ComputedRef<number>
  levelAction: Ref<'push' | 'pull' | undefined>
  distance: Ref<number>
  push: (childSize: number) => void
  pull: (childSize: number) => void
}

export const drawerToken: InjectionKey<DrawerContext> = Symbol('drawerToken')

// public token
export const DRAWER_TOKEN: InjectionKey<DrawerBindings> = Symbol('DRAWER_TOKEN')
export const DRAWER_PROVIDER_TOKEN: InjectionKey<DrawerProviderRef> = Symbol('DRAWER_PROVIDER_TOKEN')
