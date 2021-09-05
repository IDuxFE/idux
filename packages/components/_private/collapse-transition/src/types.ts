import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type CollapseTransitionMode = 'height' | 'width'

export const collapseTransitionProps = {
  name: IxPropTypes.string.def('ix-collapse-transition'),
  mode: IxPropTypes.oneOf<CollapseTransitionMode>(['height', 'width']).def('height'),
}

export type CollapseTransitionProps = IxInnerPropTypes<typeof collapseTransitionProps>
export type CollapseTransitionPublicProps = IxPublicPropTypes<typeof collapseTransitionProps>
export type CollapseTransitionComponent = DefineComponent<HTMLAttributes & typeof collapseTransitionProps>
export type CollapseTransitionInstance = InstanceType<DefineComponent<CollapseTransitionProps>>
