import type { DefineComponent } from 'vue'
import type { ButtonMode, ComponentSize } from '@idux/components/core/types'

export type ButtonShape = 'circle' | 'round'
interface ButtonOriginalProps {
  mode?: ButtonMode
  danger?: boolean
  ghost?: boolean
  disabled?: boolean
  loading?: boolean
  size?: ComponentSize
  shape?: ButtonShape
  block?: boolean
  icon?: string
}

export type ButtonProps = Readonly<ButtonOriginalProps>

export type IxButtonComponent = InstanceType<DefineComponent<ButtonProps>>

interface ButtonGroupOriginalProps {
  mode?: ButtonMode
  size?: ComponentSize
  shape?: ButtonShape
}

export type ButtonGroupProps = Readonly<ButtonGroupOriginalProps>

export type IxButtonGroupComponent = InstanceType<DefineComponent<ButtonGroupProps>>
