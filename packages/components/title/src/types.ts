import type { DefineComponent } from 'vue'

export interface TitleProps {
  title?: string
  subTitle?: string
  extra?: string | string[]
  size?: 'extraLarge' | 'large' | 'medium' | 'small'
  prefix?: string
}

export type TitleComponent = InstanceType<DefineComponent<TitleProps>>
