import { installComponent } from '@idux/components/core/utils'
import IxSpace from './src/Space.vue'

IxSpace.install = installComponent(IxSpace)

export { IxSpace }
export * from './src/types'
