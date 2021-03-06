import type { DefineComponent } from 'vue'
import type { CardSize } from '@idux/components/core/config'
interface CardOriginalProps {
  title?: string
  extra?: string
  hoverable?: boolean
  borderless?: boolean
  loading: boolean
  size?: CardSize
}

export type CardProps = Readonly<CardOriginalProps>
export type { CardSize }
export type CardComponent = InstanceType<DefineComponent<CardProps>>
