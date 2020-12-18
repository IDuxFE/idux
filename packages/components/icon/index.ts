import { installComponent } from '@idux/components/core/utils'
import IxIcon from './src/Icon.vue'

IxIcon.install = installComponent(IxIcon)

export { IxIcon }
export type { IconComponent, IconDefinition } from './src/types'
export * from './src/helper'
export * from './src/definitions'
