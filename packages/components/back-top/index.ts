import { installComponent } from '@idux/components/utils'
import IxBackTop from './src/BackTop.vue'

IxBackTop.install = installComponent(IxBackTop)

export { IxBackTop }

export type { BackTopComponent, BackTopProps } from './src/types'
