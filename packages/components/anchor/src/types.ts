import type { DefineComponent } from 'vue'
import { PropTypes } from '@idux/cdk/utils'

export interface AnchorProps {
  affix?: boolean
  bounds?: number
  hideLinkBall?: boolean
  offsetTop?: number
  target?: string | HTMLElement | Window
  targetOffset?: number
}

export const anchorPropsDef = {
  affix: PropTypes.bool.def(true),
  bounds: PropTypes.number,
  hideLinkBall: PropTypes.bool,
  offsetTop: PropTypes.number,
  target: PropTypes.oneOfType([PropTypes.string, HTMLElement, Window]),
  targetOffset: PropTypes.number,
}

export type AnchorInstance = InstanceType<DefineComponent<AnchorProps>>

export interface AnchorLinkProps {
  /** 锚点链接 */
  href: string
  /** 文字内容 */
  title?: string
}

export const linkPropsDef = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export type AnchorLinkInstance = InstanceType<DefineComponent<AnchorLinkProps>>
