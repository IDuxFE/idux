/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DrawerComponent } from './src/types'

import Drawer from './src/Drawer'

const IxDrawer = Drawer as unknown as DrawerComponent

export { IxDrawer }

export type { DrawerInstance, DrawerPublicProps as DrawerProps } from './src/types'
