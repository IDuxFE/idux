/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const rateProps = {
  value: IxPropTypes.oneOfType([Number, String]).def(0),
  allowHalf: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  count: IxPropTypes.oneOfType([Number, String]),
  disabled: IxPropTypes.bool,
  icon: IxPropTypes.string,
  tooltips: IxPropTypes.arrayOf(String),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: number) => void>(),
  onChange: IxPropTypes.emit<(value: number) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type RateProps = IxInnerPropTypes<typeof rateProps>
export type RatePublicProps = IxPublicPropTypes<typeof rateProps>
export interface RateBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}
export type RateComponent = DefineComponent<Omit<HTMLAttributes, keyof RatePublicProps> & RatePublicProps, RateBindings>
export type RateInstance = InstanceType<DefineComponent<RateProps, RateBindings>>
