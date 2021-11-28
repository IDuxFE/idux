/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export type InputNumberButtonPosition = 'inner' | 'outer'

export const inputNumberProps = {
  value: IxPropTypes.oneOfType<number | null>([IxPropTypes.number]),
  control: controlPropDef,
  disabled: IxPropTypes.bool.def(false),
  keyboard: IxPropTypes.bool,
  max: IxPropTypes.number.def(Infinity),
  min: IxPropTypes.number.def(-Infinity),
  placeholder: IxPropTypes.string,
  precision: IxPropTypes.number,
  readonly: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  step: IxPropTypes.number.def(1),

  // events
  'onUpdate:value': IxPropTypes.emit<(value: number | null) => void>(),
  onChange: IxPropTypes.emit<(value: number | null, oldValue: number | null | undefined) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type InputNumberProps = IxInnerPropTypes<typeof inputNumberProps>
export type InputNumberPublicProps = IxPublicPropTypes<typeof inputNumberProps>
export interface InputNumberBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type InputNumberComponent = DefineComponent<
  Omit<HTMLAttributes, keyof InputNumberPublicProps> & InputNumberPublicProps,
  InputNumberBindings
>
export type InputNumberInstance = InstanceType<DefineComponent<InputNumberProps>>
