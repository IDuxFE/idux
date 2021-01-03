import type { DefineComponent } from 'vue'
import type { ButtonMode, ButtonSize } from '@idux/components/core/config'

export type { ButtonMode, ButtonSize }
export type ButtonShape = 'circle' | 'round'

interface ButtonOriginalProps {
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

export type ButtonProps = Readonly<ButtonOriginalProps>

export type ButtonComponent = InstanceType<DefineComponent<ButtonProps>>

interface ButtonGroupOriginalProps {
  mode?: ButtonMode
  size?: ButtonSize
  shape?: ButtonShape
}

export type ButtonGroupProps = Readonly<ButtonGroupOriginalProps>

export type ButtonGroupComponent = InstanceType<DefineComponent<ButtonGroupProps>>
