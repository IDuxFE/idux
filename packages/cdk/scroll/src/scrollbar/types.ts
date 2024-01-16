/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { CSSProperties, DefineComponent, HTMLAttributes, PropType } from 'vue'

export const scrollbarProps = {
  horizontal: { type: Boolean, default: false },
  scrollOffset: { type: Number, default: 0 },
  scrollRange: { type: Number, required: true },
  containerSize: { type: Number, required: true },
  thumbMinSize: { type: Number, default: 10 },
  containerStyle: { type: Object as PropType<CSSProperties> },
  thumbStyle: { type: Object as PropType<CSSProperties> },

  onScroll: [Function, Array] as PropType<MaybeArray<(offset: number) => void>>,
  onMoveStart: [Function, Array] as PropType<MaybeArray<() => void>>,
  onMoveEnd: [Function, Array] as PropType<MaybeArray<() => void>>,
} as const

export type ScrollbarProps = ExtractInnerPropTypes<typeof scrollbarProps>
export type ScrollbarPublicProps = ExtractPublicPropTypes<typeof scrollbarProps>
export type ScrollbarComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ScrollbarPublicProps> & ScrollbarPublicProps
>
export type ScrollBarInstance = InstanceType<DefineComponent<ScrollbarProps>>
