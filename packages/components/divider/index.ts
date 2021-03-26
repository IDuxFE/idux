import { installComponent } from '@idux/components/utils'
import IxDivider from './src/Divider.vue'

IxDivider.install = installComponent(IxDivider)

export { IxDivider }

export type { DividerComponent, DividerProps } from './src/types'

export type { DividerPosition, DividerType } from '@idux/components/config'
