import type { DefineComponent } from 'vue'

interface RateOriginalProps {
  value: number
  count?: number
  icon?: string
  allowHalf?: boolean
  disabled?: boolean
  tooltips?: string[]
  allowClear?: boolean
}

export type RateProps = Readonly<RateOriginalProps>

export type RateComponent = InstanceType<DefineComponent<RateProps>>
