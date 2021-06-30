import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type CardSize = 'medium' | 'small'

export const cardProps = {
  title: IxPropTypes.string,
  extra: IxPropTypes.string,
  hoverable: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
  loading: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<CardSize>(['medium', 'small']),
}

export type CardProps = IxInnerPropTypes<typeof cardProps>
export type CardPublicProps = IxPublicPropTypes<typeof cardProps>
export type CardComponent = DefineComponent<HTMLAttributes & typeof cardProps>
export type CardInstance = InstanceType<DefineComponent<CardProps>>
