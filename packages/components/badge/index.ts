import { installComponent } from '@idux/components/core/utils'
import IxBadge from './src/Badge.vue'

IxBadge.install = installComponent(IxBadge)

export { IxBadge }
export * from './src/types'
