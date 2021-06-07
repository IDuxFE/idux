import type { DefineComponent } from 'vue'
import type { CardSize } from '@idux/components/config'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const cardProps = {
  title: IxPropTypes.string,
  extra: IxPropTypes.string,
  hoverable: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
  loading: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<CardSize>(['medium', 'small']),
}

export type CardProps = IxExtractPropTypes<typeof cardProps>

export type CardInstance = InstanceType<DefineComponent<CardProps>>
