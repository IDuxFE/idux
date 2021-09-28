import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const rateProps = {
  value: IxPropTypes.oneOfType([Number, String]).def(0),
  count: IxPropTypes.oneOfType([Number, String]),
  icon: IxPropTypes.string,
  allowHalf: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  tooltips: IxPropTypes.arrayOf(String),
  allowClear: IxPropTypes.bool,
}

export type RateProps = IxInnerPropTypes<typeof rateProps>
export type RatePublicProps = IxPublicPropTypes<typeof rateProps>
export type RateComponent = DefineComponent<Omit<HTMLAttributes, keyof RatePublicProps> & RatePublicProps>
export type RateInstance = InstanceType<DefineComponent<RateProps>>
