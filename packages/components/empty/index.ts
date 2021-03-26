import { installComponent } from '@idux/components/utils'
import IxEmpty from './src/Empty.vue'

IxEmpty.install = installComponent(IxEmpty)

export { IxEmpty }

export type { EmptyComponent, EmptyProps } from './src/types'
