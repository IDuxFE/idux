import type { ComponentSize, ButtonMode } from '../types'

export type GlobalConfigKey = keyof GlobalConfig

export interface GlobalConfig {
  button: ButtonConfig
  icon: IconConfig
}

export interface ButtonConfig {
  mode: ButtonMode
  size: ComponentSize
}

export interface IconConfig {
  loadIconDynamically?: (iconName: string) => Promise<string>
}
