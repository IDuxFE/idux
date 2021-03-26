import { installComponent } from '@idux/components/utils'
import IxResult from './src/Result.vue'

IxResult.install = installComponent(IxResult)

export { IxResult }

export type { ResultComponent, ResultProps } from './src/types'
