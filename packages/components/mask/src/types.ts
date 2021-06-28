import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const maskProps = {
  mask: IxPropTypes.bool,
  maskClass: IxPropTypes.string,
}

export type MaskProps = IxExtractPropTypes<typeof maskProps>

export type MaskInstance = InstanceType<DefineComponent<MaskProps>>
