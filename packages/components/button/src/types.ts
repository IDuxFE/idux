import type { ButtonMode, ComponentSize } from '@idux/components/core/types'

export type ButtonShape = 'circle' | 'round'
export interface ButtonProps {
  readonly mode?: ButtonMode
  readonly danger?: boolean
  readonly ghost?: boolean
  readonly disabled?: boolean
  readonly loading?: boolean
  readonly size?: ComponentSize
  readonly shape?: ButtonShape
  readonly block?: boolean
  readonly icon?: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonComponent extends ButtonProps {}

export interface ButtonGroupProps {
  readonly mode?: ButtonMode
  readonly size?: ComponentSize
  readonly shape?: ButtonShape
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonGroupComponent extends ButtonGroupProps {}
