/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerComponent, DrawerProviderComponent } from './src/types'

import Drawer from './src/Drawer'
import DrawerProvider from './src/DrawerProvider'

const IxDrawer = Drawer as unknown as DrawerComponent
const IxDrawerProvider = DrawerProvider as unknown as DrawerProviderComponent

export { IxDrawer, IxDrawerProvider }
export { useDrawer } from './src/useDrawer'
export { DRAWER_TOKEN } from './src/token'

export type {
  DrawerInstance,
  DrawerComponent,
  DrawerPublicProps as DrawerProps,
  DrawerProviderInstance,
  DrawerProviderComponent,
  DrawerProviderRef,
  DrawerButtonProps,
  DrawerOptions,
  DrawerRef,
  DrawerBindings,
} from './src/types'
