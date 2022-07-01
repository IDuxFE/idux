/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type AffixDirection = 'top' | 'bottom' | 'left' | 'right'
export type AffixOffset = number | string | Partial<Record<AffixDirection, number | string>>

export const affixProps = {
  offset: {
    type: [Number, String, Object] as PropType<AffixOffset>,
    default: 0,
  },
  target: [String, HTMLElement, Function] as PropType<string | HTMLElement | (() => string | HTMLElement)>,
  onChange: Function as PropType<(value: boolean) => void>,
}

export interface AffixBindings {
  update: () => void
}

export type AffixProps = ExtractInnerPropTypes<typeof affixProps>
export type AffixPublicProps = ExtractPublicPropTypes<typeof affixProps>
export type AffixComponent = DefineComponent<
  Omit<HTMLAttributes, keyof AffixPublicProps> & AffixPublicProps,
  AffixBindings
>
export type AffixInstance = InstanceType<DefineComponent<AffixProps, AffixBindings>>
