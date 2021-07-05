import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type DividerPosition = 'left' | 'center' | 'right'
export type DividerType = 'horizontal' | 'vertical'

export const dividerProps = {
  dashed: IxPropTypes.bool,
  plain: IxPropTypes.bool,
  position: IxPropTypes.oneOf<DividerPosition>(['left', 'center', 'right']),
  type: IxPropTypes.oneOf<DividerType>(['horizontal', 'vertical']),
}

export type DividerProps = IxInnerPropTypes<typeof dividerProps>
export type DividerPublicProps = IxPublicPropTypes<typeof dividerProps>
export type DividerComponent = DefineComponent<HTMLAttributes & typeof dividerProps>
export type DividerInstance = InstanceType<DefineComponent<DividerProps>>
