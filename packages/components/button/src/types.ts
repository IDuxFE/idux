import type { DefineComponent } from 'vue'
import type { ButtonSize } from '@idux/components/config'

import { PropTypes } from '@idux/cdk/utils'

export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
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
  type: string
}

export const buttonPropsDef = {
  mode: PropTypes.oneOf(['primary', 'default', 'dashed', 'text', 'link'] as const),
  danger: PropTypes.bool,
  ghost: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
  shape: PropTypes.oneOf(['circle', 'round'] as const),
  block: PropTypes.bool,
  icon: PropTypes.string,
  type: PropTypes.string.def('button'),
}

export type ButtonInstance = InstanceType<DefineComponent<ButtonProps>>

export interface ButtonGroupProps {
  mode?: ButtonMode
  size?: ButtonSize
  shape?: ButtonShape
}

export const buttonGroupPropsDef = {
  mode: PropTypes.oneOf(['primary', 'default', 'dashed', 'text', 'link'] as const),
  size: PropTypes.oneOf(['large', 'medium', 'small'] as const),
  shape: PropTypes.oneOf(['circle', 'round'] as const),
}

export type ButtonGroupInstance = InstanceType<DefineComponent<ButtonGroupProps>>
