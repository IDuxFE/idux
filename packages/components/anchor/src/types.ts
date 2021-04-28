import type { DefineComponent, Ref, SetupContext } from 'vue'

interface AnchorOriginalProps {
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

interface AnchorLinkOriginalProps {
  /** 锚点链接 */
  href: string
  /** 文字内容 */
  title: string
}

export type Section = {
  link: string
  top: number
}

export interface Anchor {
  registerLink: (link: string) => void
  unregisterLink: (link: string) => void
  activeLink: Ref<string>
  handleScrollTo: (link: string) => void
  context: SetupContext
}

export type AnchorProps = Readonly<AnchorOriginalProps>

export type AnchorLinksProps = Readonly<AnchorLinkOriginalProps>

export type AnchorComponent = InstanceType<DefineComponent<AnchorProps>>

export type AnchorLinkComponent = InstanceType<DefineComponent<AnchorLinksProps>>
