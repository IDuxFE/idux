import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const maskProps = {
  mask: IxPropTypes.bool.def(true),
  transitionName: IxPropTypes.string.def('ix-fade'),
  visible: IxPropTypes.bool.def(true),
  zIndex: IxPropTypes.number,
}

export type MaskProps = IxInnerPropTypes<typeof maskProps>
export type MaskPublicProps = IxPublicPropTypes<typeof maskProps>
export type MaskComponent = DefineComponent<HTMLAttributes & typeof maskProps>
export type MaskInstance = InstanceType<DefineComponent<MaskProps>>
