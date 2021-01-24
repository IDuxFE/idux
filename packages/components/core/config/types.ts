export type GlobalConfigKey = keyof GlobalConfig

export interface GlobalConfig {
  button: ButtonConfig
  icon: IconConfig
  badge: BadgeConfig
  divider: DividerConfig
  image: ImageConfig
  spin: SpinConfig
  space: SpaceConfig
  result: ResultConfig
  rate: RateConfig
  input: InputConfig
  textarea: TextareaConfig
  backTop: BackTopConfig
  card: CardConfig
}

export type ButtonMode = 'primary' | 'default' | 'dashed' | 'text' | 'link'
export type ButtonSize = 'large' | 'medium' | 'small'
export interface ButtonConfig {
  mode: ButtonMode
  size: ButtonSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

export interface BadgeConfig {
  showZero: boolean
  dot: boolean
  overflowCount: number | string
}

export type DividerPosition = 'left' | 'center' | 'right'
export type DividerType = 'horizontal' | 'vertical'
export interface DividerConfig {
  dashed: boolean
  plain: boolean
  position: DividerPosition
  type: DividerType
}

export interface ImageConfig {
  width: string | number
  height: string | number
  fallback: string
}

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'large' | 'medium' | 'small'
export interface SpinConfig {
  icon: string
  tip: string
  tipAlign: SpinTipAlignType
  size: SpinSize
}

export type SpaceSize = 'small' | 'medium' | 'large' | number
export interface SpaceConfig {
  size: SpaceSize
}

export type ResultStatus = 'success' | 'error' | 'info' | 'warning'
export interface ResultConfig {
  status: ResultStatus
}

export interface RateConfig {
  count: number
  icon: string
  allowHalf: boolean
  allowClear: boolean
}

export type InputSize = 'small' | 'medium' | 'large'
export interface InputConfig {
  size: InputSize
  clearable: boolean
  borderless: boolean
}

export type TextareaResize = 'none' | 'both' | 'horizontal' | 'vertical'
export type TextareaAutoRows = { minRows: number; maxRows: number }
export interface TextareaConfig {
  resize: TextareaResize
  autoRows: boolean | TextareaAutoRows
  showCount: boolean
  maxCount?: number | string
  computeCount?: (value: string) => string
  size: InputSize
  clearable: boolean
}

export interface BackTopConfig {
  duration: number
  visibilityHeight: number
}

export type CardSize = 'default' | 'small'
export interface CardConfig {
  size: CardSize
  title: string
  extra: string
  borderless: boolean
  hoverable: boolean
  loading: boolean
}
