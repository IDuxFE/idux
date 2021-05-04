import type { DefineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export interface AnchorProps {
  /** 固定模式, false为不浮动，状态不随页面滚动变化 */
  affix?: boolean
  /** affix={false} 时是否显示小圆点 */
  showInkInFixed?: boolean
  /** 指定滚动的容器 */
  target?: string | HTMLElement | Window
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number
  /** 锚点滚动偏移量，默认与 offsetTop 相同 */
  targetOffset?: number
}

export const anchorPropsDef = {
  affix: PropTypes.bool.def(true),
  showInkInFixed: PropTypes.bool,
  target: PropTypes.oneOfType([PropTypes.string, HTMLElement, Window]),
  offsetTop: PropTypes.number,
  targetOffset: PropTypes.number,
}

export type AnchorComponent = InstanceType<DefineComponent<AnchorProps>>

export interface LinkProps {
  /** 锚点链接 */
  href: string
  /** 文字内容 */
  title?: string
}

export const linkPropsDef = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export type LinkComponent = InstanceType<DefineComponent<LinkProps>>
