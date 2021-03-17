import type { DefineComponent } from 'vue'

export interface SpinProps {
  spinning?: boolean
  icon?: string
  tip?: string
  tipAlign?: 'vertical' | 'horizontal'
  size?: 'large' | 'medium' | 'small'
}

export type SpinComponent = InstanceType<DefineComponent<SpinProps>>
