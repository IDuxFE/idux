import { installComponent } from '@idux/components/utils'
import IxRate from './src/Rate.vue'

IxRate.install = installComponent(IxRate)

export { IxRate }

export type { RateComponent, RateProps } from './src/types'
