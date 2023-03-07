/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { AbstractControl } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const switchProps = {
  control: {
    type: [String, Number, Object, Array] as PropType<string | number | (string | number)[] | AbstractControl>,
    default: undefined,
  },
  checked: { type: Boolean, default: undefined },

  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  labels: { type: Array as PropType<string[]>, default: () => [] },
  loading: { type: Boolean, default: false },
  size: String as PropType<'sm' | 'md' | 'lg'>,

  // events
  'onUpdate:checked': [Function, Array] as PropType<MaybeArray<(checked: boolean) => void>>,
  onChange: [Function, Array] as PropType<MaybeArray<(checked: boolean, oldChecked: boolean) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

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
