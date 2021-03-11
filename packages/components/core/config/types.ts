import type { Placement } from '@popperjs/core'
import type { OverlayTrigger } from '@idux/cdk/overlay'

// General
export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonSize = 'large' | 'medium' | 'small'
export interface ButtonConfig {
  mode: ButtonMode
  size: ButtonSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

// Layout
export type DividerPosition = 'left' | 'center' | 'right'
export type DividerType = 'horizontal' | 'vertical'
export interface DividerConfig {
  dashed: boolean
  plain: boolean
  position: DividerPosition
  type: DividerType
}

export type SpaceSize = 'small' | 'medium' | 'large' | number
export interface SpaceConfig {
  size: SpaceSize
}

export interface RowConfig {
  wrap: boolean
}

// Navigation

// Data Entry
type FormSize = 'small' | 'medium' | 'large'
export type InputSize = FormSize
export interface InputConfig {
  size: InputSize
  clearable: boolean
  borderless: boolean
}

export type TextareaSize = FormSize
export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'
export type TextareaAutoRows = { minRows: number; maxRows: number }
export interface TextareaConfig {
  resize: TextareaResize
  autoRows: boolean | TextareaAutoRows
  showCount: boolean
  maxCount?: number | string
  computeCount?: (value: string) => string
  size: TextareaSize
  clearable: boolean
}

export interface RateConfig {
  count: number
  icon: string
  allowHalf: boolean
  allowClear: boolean
}

// Data Display
export interface BadgeConfig {
  showZero: boolean
  dot: boolean
  overflowCount: number | string
}

export type CardSize = 'medium' | 'small'
export interface CardConfig {
  size: CardSize
  borderless: boolean
  hoverable: boolean
}

export interface ImageConfig {
  width: string | number
  height: string | number
  fallback: string
}

export interface NumFormatted {
  value: string

  /** 格式化后的整数部分 */
  int: string

  /** 格式化后的小数部分，带小数点 */
  decimal: string
}
export type NumFormatter = (value: string | number, precision: number) => NumFormatted
export interface StatisticConfig {
  precision: number
  formatter: NumFormatter
}

export interface TooltipConfig {
  placement: Placement
  trigger: OverlayTrigger
  showDelay: number
  hideDelay: number
  destroyOnHide: boolean
  autoAdjust: boolean
}

// Feedback
export interface MessageConfig {
  duration: number
  maxCount: number
  top: number
  pauseOnHover: boolean
}
export type ResultStatus = 'success' | 'error' | 'info' | 'warning'
export interface ResultConfig {
  status: ResultStatus
}

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'large' | 'medium' | 'small'
export interface SpinConfig {
  icon: string
  tip: string
  tipAlign: SpinTipAlignType
  size: SpinSize
}

// Other

export interface BackTopConfig {
  duration: number
  visibilityHeight: number
}

// --- end ---

export interface GlobalConfig {
  // General
  button: ButtonConfig
  icon: IconConfig
  // Layout
  divider: DividerConfig
  space: SpaceConfig
  row: RowConfig
  // Navigation
  // Data Entry
  input: InputConfig
  textarea: TextareaConfig
  rate: RateConfig
  // Data Display
  badge: BadgeConfig
  card: CardConfig
  image: ImageConfig
  statistic: StatisticConfig
  tooltip: TooltipConfig
  // Feedback
  message: MessageConfig
  result: ResultConfig
  spin: SpinConfig
  // Other
  backTop: BackTopConfig
  // --- end ---
}

export type GlobalConfigKey = keyof GlobalConfig
