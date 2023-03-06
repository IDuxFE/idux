/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, VKey } from '@idux/cdk/utils'
import type { PropType, Slots, VNodeChild } from 'vue'

export type InputFormater<V = unknown> = (value: V) => string
export type InputParser<V = unknown> = (input: string) => V | null

export interface PanelRenderContext<V = unknown> {
  slots: Slots
  input: string
  value: V
  ok: () => void
  cancel: () => void
  setValue: (value: V) => void
  setOnKeyDown: (onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void
}

export interface Segment<V = unknown> {
  name: string
  inputClassName: string | (string | undefined)[]
  placeholder?: string
  defaultValue?: V
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
  disabled: Boolean,
  segment: {
    type: Object as PropType<Segment>,
    required: true,
  },
} as const
export type SegmentProps = ExtractInnerPropTypes<typeof segmentProps>
