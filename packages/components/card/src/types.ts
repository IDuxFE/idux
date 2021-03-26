import type { DefineComponent } from 'vue'
import type { CardSize } from '@idux/components/config'

export interface CardProps {
  title?: string
  extra?: string
  hoverable?: boolean
  borderless?: boolean
  loading: boolean
  size?: CardSize
}

export type CardComponent = InstanceType<DefineComponent<CardProps>>
