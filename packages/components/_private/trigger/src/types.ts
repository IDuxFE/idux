/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { DefineComponent, HTMLAttributes, PropType, Slot } from 'vue'

export const triggerProps = {
  value: { type: null, default: undefined },
  raw: { type: Boolean, default: false },
  borderless: { type: Boolean, default: undefined },
  clearable: { type: Boolean, default: undefined },
  clearIcon: { type: String as PropType<string>, default: 'close-circle' },
  disabled: { type: Boolean, default: undefined },
  focused: { type: Boolean, default: undefined },
  monitorFocus: { type: Boolean, default: true },
  paddingless: { type: Boolean, default: false },
  placeholder: String,
  readonly: { type: Boolean, default: undefined },
  size: { type: String as PropType<FormSize>, default: 'md' },
  status: String as PropType<ValidateStatus>,
  suffix: String as PropType<string>,
  suffixRotate: { type: [Boolean, Number, String] as PropType<boolean | string | number>, default: undefined },
  ariaControls: { type: String, default: undefined },
  onClear: [Array, Function] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onFocus: [Array, Function] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Array, Function] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

interface TriggerBindings {
  blur: () => void
  focus: (options?: FocusOptions) => void
}

export type TriggerDefaultSlotParams = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  borderless: boolean
  disabled: boolean
  readonly: boolean
  focused: boolean
  size: FormSize
  status: ValidateStatus | undefined
  suffix: string | undefined
  suffixRotate: boolean | string | number | undefined
  clearable: boolean
  clearIcon: string
  ariaControls: string
}

export type TriggerSlots = {
  suffix?: Slot
  clearIcon?: Slot
  default?: Slot<TriggerDefaultSlotParams>
  placeholder?: Slot
}
export type TriggerProps = ExtractInnerPropTypes<typeof triggerProps>
export type TriggerPublicProps = ExtractPublicPropTypes<typeof triggerProps>
export type TriggerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof TriggerPublicProps> & TriggerPublicProps,
  TriggerBindings
>
export type TriggerInstance = InstanceType<DefineComponent<TriggerProps, TriggerBindings>>
