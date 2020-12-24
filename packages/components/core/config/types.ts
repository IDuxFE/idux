import type { ComponentSize, ButtonMode } from '../types'

export type GlobalConfigKey = keyof GlobalConfig

export interface GlobalConfig {
  button: ButtonConfig
  icon: IconConfig
  badge: BadgeConfig
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
