/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type AffixDirection = 'top' | 'bottom' | 'left' | 'right'
export type AffixOffset = number | string | Partial<Record<AffixDirection, number | string>>

export const affixProps = {
  offset: IxPropTypes.oneOfType([Number, String, IxPropTypes.object<AffixOffset>()]).def(0),
  target: IxPropTypes.oneOfType([String, HTMLElement, IxPropTypes.func<() => string | HTMLElement>()]),
  onChange: IxPropTypes.func<(value: boolean) => void>(),
}

export type AffixProps = ExtractInnerPropTypes<typeof affixProps>
export type AffixPublicProps = ExtractPublicPropTypes<typeof affixProps>
export type AffixComponent = DefineComponent<Omit<HTMLAttributes, keyof AffixPublicProps> & AffixPublicProps>
export type AffixInstance = InstanceType<DefineComponent<AffixProps>>
