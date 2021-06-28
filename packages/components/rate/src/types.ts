import type { DefineComponent } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const rateProps = {
  value: IxPropTypes.oneOfType([Number, String]).def(0),
  count: IxPropTypes.oneOfType([Number, String]),
  icon: IxPropTypes.string,
  allowHalf: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  tooltips: IxPropTypes.arrayOf(String),
  allowClear: IxPropTypes.bool,
}

export type RateProps = IxExtractPropTypes<typeof rateProps>

export type RateInstance = InstanceType<DefineComponent<RateProps>>
