import type { ComponentSize, ButtonMode } from '../types'

export type GlobalConfigKey = keyof GlobalConfig

export interface GlobalConfig {
  button: ButtonConfig
}

export interface ButtonConfig {
  mode: ButtonMode
  size: ComponentSize
}
