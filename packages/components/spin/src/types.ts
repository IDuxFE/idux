import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type SpinTipAlignType = 'horizontal' | 'vertical'
export type SpinSize = 'large' | 'medium' | 'small'

export const spinProps = {
  spinning: IxPropTypes.bool.def(true),
  icon: IxPropTypes.string,
  tip: IxPropTypes.string,
  tipAlign: IxPropTypes.oneOf(['horizontal', 'vertical'] as const),
  size: IxPropTypes.oneOf(['large', 'medium', 'small'] as const),
}

export type SpinProps = IxInnerPropTypes<typeof spinProps>
export type SpinPublicProps = IxPublicPropTypes<typeof spinProps>
export type SpinComponent = DefineComponent<Omit<HTMLAttributes, keyof SpinPublicProps> & SpinPublicProps>
export type SpinInstance = InstanceType<DefineComponent<SpinProps>>
