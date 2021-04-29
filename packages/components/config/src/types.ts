import type { OverlayPlacement, OverlayTrigger } from '@idux/cdk/overlay'

// General

export type ButtonSize = 'large' | 'medium' | 'small'
export interface ButtonConfig {
  size: ButtonSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

export interface TagConfig {
  closable: boolean
  checkAble: boolean
  isRound: boolean
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
export interface DropdownConfig {
  placement: OverlayPlacement
  trigger: OverlayTrigger
}

export type MenuTheme = 'light' | 'dark'
export interface MenuConfig {
  indent: number
  theme: MenuTheme
}

export interface SubMenuConfig {
  suffix: string
  suffixRotates: [number, number]
}

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

export type RadioSize = FormSize
export type RadioMode = 'border' | 'fill'
export interface RadioGroupConfig {
  size: RadioSize
  mode: RadioMode
}

export interface RateConfig {
  count: number
  icon: string
  allowHalf: boolean
  allowClear: boolean
}

export type SelectSize = FormSize
export interface SelectConfig {
  borderless: boolean
  clearable: boolean
  labelKey: string
  searchable: boolean
  size: SelectSize
  suffix?: string
  valueKey: string
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

export interface CollapseConfig {
  accordion: boolean
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
  placement: OverlayPlacement
  trigger: OverlayTrigger
  showDelay: number
  hideDelay: number
  destroyOnHide: boolean
  autoAdjust: boolean
}

export interface PopoverConfig {
  placement: OverlayPlacement
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
  destroyOnHover: boolean
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

export type ProgressSize = 'small' | 'medium'
export type ProgressFormat = (percent: number, successPercent?: number) => string
export interface ProgressConfig {
  size: ProgressSize
  format: ProgressFormat
}

// Steps

export type StepsSize = 'medium' | 'small'
export interface StepsConfig {
  size: StepsSize
}

// Other

export interface BackTopConfig {
  duration: number
  visibilityHeight: number
}
export interface AnchorConfig {
  showInkInFixed: boolean
}
// --- end ---

export interface GlobalConfig {
  // General
  button: ButtonConfig
  icon: IconConfig
  tag: TagConfig
  // Layout
  divider: DividerConfig
  space: SpaceConfig
  row: RowConfig
  // Navigation
  dropdown: DropdownConfig
  menu: MenuConfig
  subMenu: SubMenuConfig
  // Data Entry
  input: InputConfig
  textarea: TextareaConfig
  radioGroup: RadioGroupConfig
  rate: RateConfig
  select: SelectConfig
  // Data Display
  badge: BadgeConfig
  card: CardConfig
  collapse: CollapseConfig
  image: ImageConfig
  statistic: StatisticConfig
  tooltip: TooltipConfig
  popover: PopoverConfig
  steps: StepsConfig
  // Feedback
  message: MessageConfig
  result: ResultConfig
  spin: SpinConfig
  progress: ProgressConfig
  // Other
  backTop: BackTopConfig
  anchor: AnchorConfig
  // --- end ---
}

export type GlobalConfigKey = keyof GlobalConfig
