import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const emptyProps = {
  description: IxPropTypes.string,
  image: IxPropTypes.string,
}

export type EmptyProps = IxInnerPropTypes<typeof emptyProps>
export type EmptyPublicProps = IxPublicPropTypes<typeof emptyProps>
export type EmptyComponent = DefineComponent<HTMLAttributes & typeof emptyProps>
export type EmptyInstance = InstanceType<DefineComponent<EmptyProps>>
