import type { DefineComponent } from 'vue'
import { NumFormatter } from '@idux/components/core/config'

interface StatisticOriginalProps {
  formatter: NumFormatter
  precision: number
  prefix: string
  suffix: string
  title: string
  value: string | number
}

export type StatisticProps = Readonly<StatisticOriginalProps>

export type StatisticComponent = InstanceType<DefineComponent<StatisticProps>>
