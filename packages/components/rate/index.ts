import { installComponent } from '@idux/components/core/utils'
import IxRate from './src/Rate.vue'

IxRate.install = installComponent(IxRate)

export { IxRate }

export type { RateComponent } from './src/types'
