import { installComponent } from '@idux/components/core/utils'
import IxDivider from './src/Divider.vue'

IxDivider.install = installComponent(IxDivider)

export { IxDivider }
export type { IxDividerComponent } from './src/types'
