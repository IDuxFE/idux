import { installComponent } from '@idux/components/utils'
import IxSpin from './src/Spin.vue'

IxSpin.install = installComponent(IxSpin)

export { IxSpin }

export type { SpinComponent, SpinProps } from './src/types'
