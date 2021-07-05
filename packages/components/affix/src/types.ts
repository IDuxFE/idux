import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type AffixDirection = 'top' | 'bottom' | 'left' | 'right'
export type AffixOffset = number | string | Partial<Record<AffixDirection, number | string>>

export const affixProps = {
  offset: IxPropTypes.oneOfType([Number, String, IxPropTypes.object<AffixOffset>()]).def(0),
  target: IxPropTypes.oneOfType([String, HTMLElement]),
  onChange: IxPropTypes.func<(value: boolean) => void>(),
}

export type AffixProps = IxInnerPropTypes<typeof affixProps>
export type AffixPublicProps = IxPublicPropTypes<typeof affixProps>
export type AffixComponent = DefineComponent<HTMLAttributes & typeof affixProps>
export type AffixInstance = InstanceType<DefineComponent<AffixProps>>
