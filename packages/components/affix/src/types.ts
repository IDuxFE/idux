import type { DefineComponent } from 'vue'

export type AffixDirection = 'top' | 'bottom' | 'left' | 'right'

export type AffixOffset = number | string | Partial<Record<AffixDirection, number | string>>

export interface AffixProps {
  /**
   * 偏移量
   * * type 为 number 时，默认是 top
   * * top 和 bottom、left 和 right 同时存在时，top 和 left 优先级较高
   */
  offset: AffixOffset
  /** 用于定位的容器，会监听容器的滚动事件 */
  target?: string | HTMLElement | Window
}

export type AffixComponent = InstanceType<DefineComponent<AffixProps>>
