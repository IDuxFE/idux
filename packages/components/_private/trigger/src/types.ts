/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

import { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'

export const triggerProps = {
  borderless: Boolean as PropType<boolean>,
  clearable: Boolean as PropType<boolean>,
  clearIcon: String as PropType<string>,
  className: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  focused: Boolean as PropType<boolean>,
  readonly: Boolean as PropType<boolean>,
  size: String as PropType<FormSize>,
  suffix: String as PropType<string>,
  onClick: [Array, Function] as PropType<MaybeArray<(evt: Event) => void>>,
  onClear: [Array, Function] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onFocus: [Array, Function] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Array, Function] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onKeyDown: [Array, Function] as PropType<MaybeArray<(evt: KeyboardEvent) => void>>,
}

export type TriggerProps = ExtractInnerPropTypes<typeof triggerProps>
export type TriggerPublicProps = ExtractPublicPropTypes<typeof triggerProps>
export type TriggerComponent = DefineComponent<Omit<HTMLAttributes, keyof TriggerPublicProps> & TriggerPublicProps>
export type TriggerInstance = InstanceType<DefineComponent<TriggerProps>>
