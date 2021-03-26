import { installComponent } from '@idux/components/utils'
import IxProgress from './src/Progress.vue'

IxProgress.install = installComponent(IxProgress)

export { IxProgress }

export type { ProgressComponent, ProgressProps } from './src/types'
