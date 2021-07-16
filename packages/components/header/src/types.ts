import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { AvatarProps } from '@idux/components/avatar'

import { IxPropTypes } from '@idux/cdk/utils'

export type HeaderSize = 'extraLarge' | 'large' | 'medium' | 'small'

export const headerProps = {
  avatar: IxPropTypes.oneOfType([String, IxPropTypes.object<AvatarProps>()]),
  extra: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  description: IxPropTypes.string,
  prefix: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  size: IxPropTypes.oneOf<HeaderSize>(['extraLarge', 'large', 'medium', 'small']).def('large'),
  showBar: IxPropTypes.bool.def(false),
  subTitle: IxPropTypes.string,
  title: IxPropTypes.string,

  // events
  onExtraClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
  onPrefixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type HeaderProps = IxInnerPropTypes<typeof headerProps>
export type HeaderPublicProps = IxPublicPropTypes<typeof headerProps>
export type HeaderComponent = DefineComponent<HTMLAttributes & typeof headerProps>
export type HeaderInstance = InstanceType<DefineComponent<HeaderProps>>
