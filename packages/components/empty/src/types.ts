import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const emptyProps = {
  description: IxPropTypes.string,
  image: IxPropTypes.string,
}

export type EmptyProps = IxExtractPropTypes<typeof emptyProps>

export type EmptyInstance = InstanceType<DefineComponent<EmptyProps>>
