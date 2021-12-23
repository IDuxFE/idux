/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, InputHTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const inputProps = {
  addonAfter: IxPropTypes.string,
  addonBefore: IxPropTypes.string,
  borderless: IxPropTypes.bool,
  clearable: IxPropTypes.bool,
  clearIcon: IxPropTypes.string,
  clearVisible: IxPropTypes.bool,
  disabled: IxPropTypes.bool,
  focused: IxPropTypes.bool,
  prefix: IxPropTypes.string,
  size: IxPropTypes.oneOf<FormSize>(['sm', 'md', 'lg']),
  suffix: IxPropTypes.string,
  onClear: IxPropTypes.func<(evt: MouseEvent) => void>(),
}

export type InputProps = IxInnerPropTypes<typeof inputProps>
export type InputPublicProps = IxPublicPropTypes<typeof inputProps>
export interface InputBindings {
  getInputElement: () => HTMLInputElement | undefined
}
export type InputComponent = DefineComponent<
  Omit<InputHTMLAttributes, keyof InputPublicProps> & InputPublicProps,
  InputBindings
>
export type InputInstance = InstanceType<DefineComponent<InputProps, InputBindings>>
