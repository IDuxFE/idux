import type { DefineComponent } from 'vue'

interface SpinOriginalProps {
  spinning?: boolean
  icon?: string
  tip?: string
  tipAlign?: 'vertical' | 'horizontal'
  size?: 'large' | 'medium' | 'small'
}

export type SpinProps = Readonly<SpinOriginalProps>

export type SpinComponent = InstanceType<DefineComponent<SpinProps>>
