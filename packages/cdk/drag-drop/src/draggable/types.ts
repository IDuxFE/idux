/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { Component, DefineComponent, HTMLAttributes, PropType } from 'vue'

export const draggableProps = {
  disabled: { type: Boolean, default: false },
  is: { type: [String, Object] as PropType<string | Component>, default: 'div' },
  onStart: [Function, Array] as PropType<MaybeArray<DraggableEvent>>,
  onMove: [Function, Array] as PropType<MaybeArray<DraggableEvent>>,
  onEnd: [Function, Array] as PropType<MaybeArray<DraggableEvent>>,
} as const

export type DraggableProps = ExtractInnerPropTypes<typeof draggableProps>
export type DraggablePublicProps = ExtractPublicPropTypes<typeof draggableProps>
export type DraggableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DraggablePublicProps> & DraggablePublicProps
>
export type DraggableInstance = InstanceType<DefineComponent<DraggableProps>>

export interface DragPosition {
  left: number
  top: number
  offsetX: number
  offsetY: number
}

export type DraggableEvent = (position: DragPosition, evt: PointerEvent) => void

export interface DraggableOptions {
  onStart?: DraggableEvent
  onMove?: DraggableEvent
  onEnd?: DraggableEvent
}
