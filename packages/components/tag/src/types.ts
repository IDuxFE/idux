import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const tagProps = {
  closable: IxPropTypes.bool,
  icon: IxPropTypes.string,
  color: IxPropTypes.string,
  checked: IxPropTypes.bool,
  checkAble: IxPropTypes.bool,
  isRound: IxPropTypes.bool,
}

export type TagProps = IxExtractPropTypes<typeof tagProps>

export type TagInstance = InstanceType<DefineComponent<TagProps>>
