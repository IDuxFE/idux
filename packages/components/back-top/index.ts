import { installComponent } from '@idux/components/core/utils'
import IxBackTop from './src/BackTop.vue'

IxBackTop.install = installComponent(IxBackTop)

export { IxBackTop }

export type { BackTopComponent, BackTopProps } from './src/types'
