import type { DefineComponent } from 'vue'
export interface SpinProps {
  // please add readonly for every prop
  readonly spinning?: boolean
  readonly icon?: string
  readonly tip?: string
  readonly tipAlign?: 'vertical' | 'horizontal'
  readonly size?: 'large' | 'medium' | 'small'
}

export type IxSpinComponent = InstanceType<DefineComponent<SpinProps>>
