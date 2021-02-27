import { installComponent } from '@idux/components/core/utils'
import IxRow from './src/Row.vue'
import IxCol from './src/Col.vue'

IxRow.install = installComponent(IxRow)
IxCol.install = installComponent(IxCol)

export { IxRow, IxCol }
export * from './src/types'
