/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerBindings, DrawerProps } from './types'
import type { DrawerConfig } from '@idux/components/config'
import type { InjectionKey, Ref, Slots } from 'vue'

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
