import type { DefineComponent } from 'vue'

export type Direction = 'top' | 'bottom' | 'left' | 'right'

export type OffsetOpt = {
  [key in Direction]?: number | string
}

export type AffixStyle = {
  position?: 'fixed' | 'absolute'
  top?: string
  bottom?: string
  left?: string
  right?: string
}

/**
 * props类型
 *
 * @interface AffixOriginalProps
 */
interface AffixOriginalProps {
  /**
   * 偏移量
   * type为number时，默认是top
   * top和bottom、left和right同时存在时，top和left优先级较高
   */
  offset: number | string | OffsetOpt
  // 用于定位的容器，会监听容器的滚动事件
  target?: string | HTMLElement | Window
}

export type AffixProps = Readonly<AffixOriginalProps>

export type AffixComponent = InstanceType<DefineComponent<AffixProps>>
