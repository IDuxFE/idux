import type { DefineComponent } from 'vue'

export interface RateProps {
  value: number
  count?: number
  icon?: string
  allowHalf?: boolean
  disabled?: boolean
  tooltips?: string[]
  allowClear?: boolean
}

export type RateInstance = InstanceType<DefineComponent<RateProps>>
