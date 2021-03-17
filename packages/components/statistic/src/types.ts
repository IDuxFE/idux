import type { DefineComponent } from 'vue'
import { NumFormatter } from '@idux/components/core/config'

export interface StatisticProps {
  formatter: NumFormatter
  precision: number
  prefix: string
  suffix: string
  title: string
  value: string | number
}

export type StatisticComponent = InstanceType<DefineComponent<StatisticProps>>
