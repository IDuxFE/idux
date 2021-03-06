import type { DefineComponent } from 'vue'

export interface TitleOriginalProps {
  title?: string
  subTitle?: string
  extra?: string | string[]
  size?: 'extraLarge' | 'large' | 'medium' | 'small'
  prefix?: string
}

export type TitleProps = Readonly<TitleOriginalProps>

export type TitleComponent = InstanceType<DefineComponent<TitleProps>>
