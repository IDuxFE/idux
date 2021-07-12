import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const headerProps = {
  extra: IxPropTypes.oneOfType([String, IxPropTypes.vNode]),
  description: IxPropTypes.string,
  prefix: IxPropTypes.string,
  size: IxPropTypes.oneOf(['extraLarge', 'large', 'medium', 'small'] as const).def('large'),
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
