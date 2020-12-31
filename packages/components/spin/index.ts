import { installComponent } from '@idux/components/core/utils'
import IxSpin from './src/Spin.vue'

IxSpin.install = installComponent(IxSpin)

export { IxSpin }
export type { IxSpinComponent } from './src/types'
