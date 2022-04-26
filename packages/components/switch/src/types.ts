/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { controlPropDef } from '@idux/cdk/forms'
import { IxPropTypes } from '@idux/cdk/utils'

export const switchProps = {
  checked: IxPropTypes.bool,
  control: controlPropDef,
  autofocus: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  labels: IxPropTypes.arrayOf(String).def(() => []),
  loading: IxPropTypes.bool.def(false),
  size: IxPropTypes.oneOf(['sm', 'md', 'lg'] as const),

  // events
  'onUpdate:checked': IxPropTypes.emit<(checked: boolean) => void>(),
  onChange: IxPropTypes.emit<(checked: boolean) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
  onFocus: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type SwitchProps = ExtractInnerPropTypes<typeof switchProps>
export type SwitchPublicProps = ExtractPublicPropTypes<typeof switchProps>
export interface SwitchBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type SwitchComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SwitchPublicProps> & SwitchPublicProps,
  SwitchBindings
>
export type SwitchInstance = InstanceType<DefineComponent<SwitchProps, SwitchBindings>>
