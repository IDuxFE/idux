import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const backTopProps = {
  count: IxPropTypes.oneOfType([Number, String]).def(0),
  showZero: IxPropTypes.bool,
  overflowCount: IxPropTypes.number,
  dot: IxPropTypes.bool,
  color: IxPropTypes.string,
}

export type BadgeProps = IxInnerPropTypes<typeof backTopProps>
export type BadgePublicProps = IxPublicPropTypes<typeof backTopProps>
export type BadgeComponent = DefineComponent<Omit<HTMLAttributes, keyof BadgePublicProps> & BadgePublicProps>
export type BadgeInstance = InstanceType<DefineComponent<BadgeProps>>
