import { installComponent } from '@idux/components/utils'
import IxBadge from './src/Badge.vue'

IxBadge.install = installComponent(IxBadge)

export { IxBadge }

export type { BadgeComponent, BadgeProps } from './src/types'
