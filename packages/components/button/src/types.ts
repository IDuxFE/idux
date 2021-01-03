import type { DefineComponent } from 'vue'
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

export type IxButtonComponent = InstanceType<DefineComponent<ButtonProps>>

export interface ButtonGroupProps {
  readonly mode?: ButtonMode
  readonly size?: ComponentSize
  readonly shape?: ButtonShape
}

export type IxButtonGroupComponent = InstanceType<DefineComponent<ButtonGroupProps>>
