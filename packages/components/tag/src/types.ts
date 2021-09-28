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
export type TagComponent = DefineComponent<Omit<HTMLAttributes, keyof TagPublicProps> & TagPublicProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>
