import type { DefineComponent } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const backTopProps = {
  count: IxPropTypes.oneOfType([Number, String]).def(0),
  showZero: IxPropTypes.bool,
  overflowCount: IxPropTypes.number,
  dot: IxPropTypes.bool,
  color: IxPropTypes.string,
}

export type BadgeProps = IxExtractPropTypes<typeof backTopProps>

export type BadgeInstance = InstanceType<DefineComponent<BadgeProps>>
