/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ColorFormat } from './color'
import type { AbstractControl, ValidateStatus } from '@idux/cdk/forms'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { FormSize } from '@idux/components/form'
import type { OverlayContainerType } from '@idux/components/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export interface ColorPreset {
  key: VKey
  label: string
  colors: string[]
  defaultOpen?: boolean
}

export const colorPickerPanelProps = {
  value: String,
  format: String as PropType<ColorFormat>,
  presets: Array as PropType<ColorPreset[]>,
  paddingless: { type: Boolean, default: false },

  // events
  'onUpdate:format': [Function, Array] as PropType<MaybeArray<(value: string | undefined) => void>>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<(value: ColorFormat) => void>>,
  onChange: [Function, Array] as PropType<
    MaybeArray<(value: string | undefined, oldValue: string | undefined) => void>
  >,
  onFormatChange: [Function, Array] as PropType<MaybeArray<(format: ColorFormat, oldFormat: ColorFormat) => void>>,
}

export type ColorPickerPanelProps = ExtractInnerPropTypes<typeof colorPickerPanelProps>
export type ColorPickerPanelPublicProps = ExtractPublicPropTypes<typeof colorPickerPanelProps>
export type ColorPickerPanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ColorPickerPanelPublicProps> & ColorPickerPanelPublicProps
>
export type ColorPickerPanelInstance = InstanceType<DefineComponent<ColorPickerPanelProps>>

export const colorPickerProps = {
  ...colorPickerPanelProps,
  control: {
    type: [String, Number, Object, Array] as PropType<string | number | (string | number)[] | AbstractControl>,
    default: undefined,
  },
  open: {
    type: Boolean,
    default: undefined,
  },

  autofocus: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: undefined,
  },
  clearIcon: String,
  disabled: {
    type: Boolean,
    default: false,
  },
  overlayClassName: String,
  overlayContainer: {
    type: [String, HTMLElement, Function] as PropType<OverlayContainerType>,
    default: undefined,
  },
  overlayTabindex: { type: Number, default: undefined },
  readonly: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: String as PropType<FormSize>,
  status: String as PropType<ValidateStatus>,
  showText: { type: Boolean, default: false },

  // events
  'onUpdate:open': [Function, Array] as PropType<MaybeArray<(isOpen: boolean) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent) => void>>,
  onFocus: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(evt: FocusEvent) => void>>,
} as const

export type ColorPickerProps = ExtractInnerPropTypes<typeof colorPickerProps>
export type ColorPickerPublicProps = ExtractPublicPropTypes<typeof colorPickerProps>
export type ColorPickerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ColorPickerPublicProps> & ColorPickerPublicProps
>
export type ColorPickerInstance = InstanceType<DefineComponent<ColorPickerProps>>
