import { installComponent } from '@idux/components/core/utils'
import IxResult from './src/Result.vue'

IxResult.install = installComponent(IxResult)

export { IxResult }
export * from './src/types'
