import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { AvatarProps } from '@idux/components/avatar'

import { IxPropTypes } from '@idux/cdk/utils'

export type HeaderSize = 'xLarge' | 'large' | 'medium' | 'small'

export const headerProps = {
  avatar: IxPropTypes.oneOfType([String, IxPropTypes.object<AvatarProps>()]),
  prefix: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  size: IxPropTypes.oneOf<HeaderSize>(['xLarge', 'large', 'medium', 'small']).def('large'),
  showBar: IxPropTypes.bool.def(false),
  subTitle: IxPropTypes.string,
  suffix: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  title: IxPropTypes.string,

  // events
  onPrefixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
  onSuffixClick: IxPropTypes.emit<(evt: MouseEvent) => void>(),
}

export type HeaderProps = IxInnerPropTypes<typeof headerProps>
export type HeaderPublicProps = IxPublicPropTypes<typeof headerProps>
export type HeaderComponent = DefineComponent<HTMLAttributes & typeof headerProps>
export type HeaderInstance = InstanceType<DefineComponent<HeaderProps>>
