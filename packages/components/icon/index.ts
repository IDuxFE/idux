import { installComponent } from '@idux/components/core/utils'
import Icon from './src/Icon.vue'

Icon.install = installComponent(Icon)

export { Icon }
export type { IconComponent, IconDefinition } from './src/types'
export * from './src/helper'
export * from './src/definitions'
