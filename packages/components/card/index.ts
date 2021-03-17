import { installComponent } from '@idux/components/core/utils'
import IxCard from './src/Card.vue'

IxCard.install = installComponent(IxCard)

export { IxCard }

export type { CardComponent, CardProps } from './src/types'

export type { CardSize } from '@idux/components/core/config'
