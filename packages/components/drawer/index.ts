import type { DrawerComponent } from './src/types'

import Drawer from './src/Drawer'

const IxDrawer = Drawer as unknown as DrawerComponent

export { IxDrawer }

export type { DrawerInstance, DrawerPublicProps as DrawerProps } from './src/types'
