import type { ComponentSize, ButtonMode, DividerPosition, DividerType, SpinTipAlignType, SpaceSize } from '../types'

export type GlobalConfigKey = keyof GlobalConfig

export interface GlobalConfig {
  button: ButtonConfig
  icon: IconConfig
  badge: BadgeConfig
  divider: DividerConfig
  image: ImageConfig
  spin: SpinConfig
  space: SpaceConfig
}

export interface ButtonConfig {
  mode: ButtonMode
  size: ComponentSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}

export interface BadgeConfig {
  showZero: boolean
  dot: boolean
  overflowCount: number | string
}

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

export interface SpinConfig {
  icon: string
  tip: string
  tipAlign: SpinTipAlignType
  size: ComponentSize
}

export interface SpaceConfig {
  size: SpaceSize
}
