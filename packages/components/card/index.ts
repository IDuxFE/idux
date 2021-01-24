import { installComponent } from '@idux/components/core/utils'
import IxCard from './src/Card.vue'

IxCard.install = installComponent(IxCard)

export { IxCard }
export * from './src/types'
