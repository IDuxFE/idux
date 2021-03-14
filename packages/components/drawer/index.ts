import { installComponent } from '@idux/components/core/utils'
import IxDrawer from './src/Drawer.vue'

IxDrawer.install = installComponent(IxDrawer)

export { IxDrawer }
export * from './src/types'
