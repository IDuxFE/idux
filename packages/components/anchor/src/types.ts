import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const anchorProps = {
  affix: IxPropTypes.bool.def(true),
  bounds: IxPropTypes.number,
  hideLinkBall: IxPropTypes.bool,
  offsetTop: IxPropTypes.number,
  target: IxPropTypes.oneOfType([String, HTMLElement]),
  targetOffset: IxPropTypes.number,

  // events
  onChange: IxPropTypes.emit<(activeLink: string) => void>(),
  onClick: IxPropTypes.emit<(evt: MouseEvent, link: AnchorLinkProps) => void>(),
}

export type AnchorProps = IxInnerPropTypes<typeof anchorProps>
export type AnchorPublicProps = IxPublicPropTypes<typeof anchorProps>
export type AnchorComponent = DefineComponent<Omit<HTMLAttributes, keyof AnchorPublicProps> & AnchorPublicProps>
export type AnchorInstance = InstanceType<DefineComponent<AnchorProps>>

export const linkProps = {
  href: IxPropTypes.string.isRequired,
  title: IxPropTypes.string,
}

export type AnchorLinkProps = IxInnerPropTypes<typeof linkProps>
export type AnchorLinkPublicProps = IxPublicPropTypes<typeof linkProps>
export type AnchorLinkComponent = DefineComponent<
  Omit<HTMLAttributes, keyof AnchorLinkPublicProps> & AnchorLinkPublicProps
>
export type AnchorLinkInstance = InstanceType<DefineComponent<AnchorLinkProps>>
