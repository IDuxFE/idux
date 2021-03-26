import { installComponent } from '@idux/components/utils'
import IxCard from './src/Card.vue'

IxCard.install = installComponent(IxCard)

export { IxCard }

export type { CardComponent, CardProps } from './src/types'

export type { CardSize } from '@idux/components/config'
