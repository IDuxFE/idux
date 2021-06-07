import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const spinProps = {
  spinning: IxPropTypes.bool.def(true),
  icon: IxPropTypes.string,
  tip: IxPropTypes.string,
  tipAlign: IxPropTypes.oneOf(['horizontal', 'vertical'] as const),
  size: IxPropTypes.oneOf(['large', 'medium', 'small'] as const),
}

export type SpinProps = IxExtractPropTypes<typeof spinProps>

export type SpinInstance = InstanceType<DefineComponent<SpinProps>>
