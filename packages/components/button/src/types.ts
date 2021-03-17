import type { DefineComponent } from 'vue'
import type { ButtonMode, ButtonSize } from '@idux/components/core/config'

export type ButtonShape = 'circle' | 'round'

export interface ButtonProps {
  mode?: ButtonMode
  danger?: boolean
  ghost?: boolean
  disabled?: boolean
  loading?: boolean
  size?: ButtonSize
  shape?: ButtonShape
  block?: boolean
  icon?: string
}

export type ButtonComponent = InstanceType<DefineComponent<ButtonProps>>

export interface ButtonGroupProps {
  mode?: ButtonMode
  size?: ButtonSize
  shape?: ButtonShape
}

export type ButtonGroupComponent = InstanceType<DefineComponent<ButtonGroupProps>>
