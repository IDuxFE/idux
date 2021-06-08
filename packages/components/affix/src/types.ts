import type { DefineComponent } from 'vue'

import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export type AffixDirection = 'top' | 'bottom' | 'left' | 'right'
export type AffixOffset = number | string | Partial<Record<AffixDirection, number | string>>

export const affixProps = {
  offset: IxPropTypes.oneOfType([Number, String, IxPropTypes.object<AffixOffset>()]).def(0),
  target: IxPropTypes.oneOfType([String, HTMLElement]),
  onChange: IxPropTypes.func<(value: boolean) => void>(),
}

export type AffixProps = IxExtractPropTypes<typeof affixProps>

export type AffixInstance = InstanceType<DefineComponent<AffixProps>>
