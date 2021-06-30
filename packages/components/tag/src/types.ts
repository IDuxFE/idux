import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const tagProps = {
  closable: IxPropTypes.bool,
  icon: IxPropTypes.string,
  color: IxPropTypes.string,
  checked: IxPropTypes.bool,
  checkAble: IxPropTypes.bool,
  isRound: IxPropTypes.bool,
}

export type TagProps = IxInnerPropTypes<typeof tagProps>
export type TagPublicProps = IxPublicPropTypes<typeof tagProps>
export type TagComponent = DefineComponent<HTMLAttributes & typeof tagProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>
