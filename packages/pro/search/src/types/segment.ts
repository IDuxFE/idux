/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, PropType, Slots, VNodeChild } from 'vue'

export interface SegmentState {
  name: string
  input: string
  value: unknown
}

export type InputFormater<V = unknown> = (value: V, states: SegmentState[]) => string
export type InputParser<V = unknown> = (input: string, states: SegmentState[]) => V | null

export type RenderLocation = 'individual' | 'quick-select-panel'

export interface PanelRenderContext<V = unknown> {
  slots: Slots
  input: string
  value: V
  states: SegmentState[]
  renderLocation: RenderLocation
  ok: () => void
  cancel: () => void
  setValue: (value: V) => void
  setOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void
}

export interface Segment<V = unknown> {
  name: string
  inputClassName?: string | (string | undefined)[]
  containerClassName?: string | (string | undefined)[]
  placeholder?: string
  visible?: (states: SegmentState[]) => boolean
  format: InputFormater<V>
  parse: InputParser<V>
  panelRenderer?: (context: PanelRenderContext<V>) => VNodeChild
  onVisibleChange?: (visible: boolean) => void
}

export const segmentProps = {
  itemKey: {
    type: [String, Number, Symbol] as PropType<VKey>,
    required: true,
  },
  input: String,
  value: null,
  selectionStart: Number,
  disabled: Boolean,
  segment: {
    type: Object as PropType<Segment>,
    required: true,
  },
} as const
export type SegmentProps = ExtractInnerPropTypes<typeof segmentProps>

export const segmentIputProps = {
  value: String,
  disabled: Boolean,
  ellipsis: Boolean,
  placeholder: String,
  onInput: [Function, Array] as PropType<MaybeArray<(input: string) => void>>,
  onWidthChange: [Function, Array] as PropType<MaybeArray<(width: number) => void>>,
}
export type SegmentInputProps = ExtractInnerPropTypes<typeof segmentIputProps>
export type SegmentInputComponent = DefineComponent<
  SegmentInputProps,
  {
    getInputElement: () => HTMLInputElement
  }
>
export type SegmentInputInstance = InstanceType<SegmentInputComponent>
