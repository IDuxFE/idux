import { installComponent } from '@idux/components/core/utils'
import IxEmpty from './src/Empty.vue'

IxEmpty.install = installComponent(IxEmpty)

export { IxEmpty }
export * from './src/types'
