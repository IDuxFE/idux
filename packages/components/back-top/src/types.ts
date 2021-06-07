import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const backTopProps = {
  target: IxPropTypes.oneOfType([String, HTMLElement]),
  duration: IxPropTypes.number,
  visibilityHeight: IxPropTypes.number,
}

export type BackTopProps = IxExtractPropTypes<typeof backTopProps>

export type BackTopInstance = InstanceType<DefineComponent<BackTopProps>>
