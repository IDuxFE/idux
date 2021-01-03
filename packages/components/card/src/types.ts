import type { CardSize } from '@idux/components/core/types'
export interface CardProps {
  // please add readonly for every prop
  readonly title?: string
  readonly extra?: string
  readonly hoverable: boolean
  readonly borderless: boolean
  readonly loading: boolean
  readonly size?: CardSize
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IxCardComponent extends CardProps {}
