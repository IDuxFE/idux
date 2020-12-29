import type { ComponentSize, ButtonMode, DividerPosition, DividerType } from '../types'

export type GlobalConfigKey = keyof GlobalConfig

export interface GlobalConfig {
  button: ButtonConfig
  icon: IconConfig
  badge: BadgeConfig
  divider: DividerConfig
  image: ImageConfig
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
