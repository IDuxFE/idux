/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type AreaSizeMap = [number]

export const splitPanelProps = {
  vertical: { type: Boolean, default: false },
  splitterSize: { type: Number, default: 2 },
  splitterColor: { type: String, default: 'transparent' },
  splitterActiveColor: { type: String, default: '#e1e5eb' },

  onSplitterMousedown: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent, index: number) => void>>,
  onSplitterMouseup: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent, index: number) => void>>,
  onSplitterMousemove: [Function, Array] as PropType<MaybeArray<(evt: MouseEvent, index: number) => void>>,
} as const

export const splitAreaProps = {
  size: { type: Number, default: undefined },
  minSize: { type: Number, default: 30 },
  onTouchedMinSizeChange: [Function, Array] as PropType<MaybeArray<(touched: boolean) => void>>,
} as const

export type SplitPanelProps = ExtractInnerPropTypes<typeof splitPanelProps>
export type SplitPanelPublicProps = ExtractPublicPropTypes<typeof splitPanelProps>
export type SplitPanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SplitPanelPublicProps> & SplitPanelPublicProps
>
export type SplitPanelInstance = InstanceType<DefineComponent<SplitPanelProps>>

export type SplitAreaProps = ExtractInnerPropTypes<typeof splitAreaProps>
export type SplitAreaPublicProps = ExtractPublicPropTypes<typeof splitAreaProps>
export type SplitAreaComponent = DefineComponent<
  Omit<HTMLAttributes, keyof SplitAreaPublicProps> & SplitAreaPublicProps
>
export type SplitAreaInstance = InstanceType<DefineComponent<SplitAreaProps>>

// private

export const splitterProps = {
  index: { type: Number, default: 0 },
  onPreAreaTouchedMinSizeChange: [Function, Array] as PropType<MaybeArray<(touched: boolean) => void>>,
  onNextAreaTouchedMinSizeChange: [Function, Array] as PropType<MaybeArray<(touched: boolean) => void>>,
} as const
