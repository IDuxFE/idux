import type { DefineComponent } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const anchorProps = {
  affix: IxPropTypes.bool.def(true),
  bounds: IxPropTypes.number,
  hideLinkBall: IxPropTypes.bool,
  offsetTop: IxPropTypes.number,
  target: IxPropTypes.oneOfType([String, HTMLElement, Window]),
  targetOffset: IxPropTypes.number,
}

export type AnchorProps = IxExtractPropTypes<typeof anchorProps>

export type AnchorInstance = InstanceType<DefineComponent<AnchorProps>>

export const linkProps = {
  href: IxPropTypes.string.isRequired,
  title: IxPropTypes.string,
}

export type AnchorLinkProps = IxExtractPropTypes<typeof linkProps>

export type AnchorLinkInstance = InstanceType<DefineComponent<AnchorLinkProps>>
