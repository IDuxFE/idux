/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, MaybeElementRef } from '@idux/cdk/utils'
import type { Component, DefineComponent, HTMLAttributes, PropType } from 'vue'

const allHandlerPlacements = [
  'top',
  'bottom',
  'start',
  'end',
  'topStart',
  'topEnd',
  'bottomStart',
  'bottomEnd',
] as const

export const resizableProps = {
  /**
   * Specifies resize boundaries.
   *
   * @default 'parent'
   */
  bounds: { type: [String, Object] as PropType<'parent' | 'window' | Window | MaybeElementRef>, default: 'parent' },
  disabled: { type: Boolean, default: false },
  handlers: { type: Array as PropType<ResizableHandlerPlacement[]>, default: () => allHandlerPlacements },
  is: { type: [String, Object] as PropType<string | Component>, default: 'div' },
  /**
   * Maximum height of resizable element
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  maxHeight: { type: Number, default: Number.MAX_SAFE_INTEGER },
  /**
   * Maximum width of resizable element
   *
   * @default Number.MAX_SAFE_INTEGER
   */
  maxWidth: { type: Number, default: Number.MAX_SAFE_INTEGER },
  /**
   * Minimum height of resizable element
   *
   * @default 8
   */
  minHeight: { type: Number, default: 8 },
  /**
   * Minimum width of resizable element
   *
   * @default 8
   */
  minWidth: { type: Number, default: 8 },
  onStart: [Function, Array] as PropType<MaybeArray<ResizableEvent>>,
  onMove: [Function, Array] as PropType<MaybeArray<ResizableEvent>>,
  onEnd: [Function, Array] as PropType<MaybeArray<ResizableEvent>>,
} as const

export type ResizableProps = ExtractInnerPropTypes<typeof resizableProps>
export type ResizablePublicProps = ExtractPublicPropTypes<typeof resizableProps>
export type ResizableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ResizablePublicProps> & ResizablePublicProps
>
export type ResizableInstance = InstanceType<DefineComponent<ResizableProps>>

export const resizableHandlerProps = {
  placement: { type: String as PropType<ResizableHandlerPlacement>, default: 'bottomEnd' },
} as const

export type ResizableHandlerProps = ExtractInnerPropTypes<typeof resizableHandlerProps>
export type ResizableHandlerPublicProps = ExtractPublicPropTypes<typeof resizableHandlerProps>
export type ResizableHandlerComponent = DefineComponent<
  Omit<HTMLAttributes, keyof ResizableHandlerPublicProps> & ResizableHandlerPublicProps
>
export type ResizableHandlerInstance = InstanceType<DefineComponent<ResizableHandlerProps>>

export type ResizableOptions = Omit<ResizablePublicProps, 'disabled' | 'is'>

export type ResizableHandlerPlacement = typeof allHandlerPlacements[number]

export interface ResizePosition {
  width: number
  height: number
  offsetWidth: number
  offsetHeight: number
}

export type ResizableEvent = (position: ResizePosition, evt: PointerEvent) => void
