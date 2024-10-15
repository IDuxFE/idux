/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Axis } from '../dnd'
import type { DndMovableBoundaryType, DndMovableMode, DndMovableStrategy, Position } from '../movable'
import type {
  ElementDropTargetEventBasePayload,
  ElementEventBasePayload,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter'
import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, MaybeElement } from '@idux/cdk/utils'
import type { Component, DefineComponent, FunctionalComponent, HTMLAttributes, PropType } from 'vue'

export const dndMovableProps = {
  offset: Object as PropType<Position>,
  tag: { type: [String, Object, Function] as PropType<string | Component | FunctionalComponent>, default: 'div' },
  allowedAxis: { type: String as PropType<Axis>, default: 'all' },
  mode: { type: String as PropType<DndMovableMode>, default: undefined },
  strategy: { type: String as PropType<DndMovableStrategy>, default: undefined },
  preview: {
    type: [Boolean, String, Object] as PropType<boolean | 'native' | { offset: { x: number; y: number } }>,
    default: undefined,
  },
  canDrag: { type: Boolean, default: true },
  dragHandle: { type: Object as PropType<MaybeElement>, default: undefined },
  dropTargets: { type: Array as PropType<(HTMLElement | undefined)[]>, default: undefined },
  boundary: { type: [String, Object, Function] as PropType<DndMovableBoundaryType>, default: undefined },

  'onUpdate:offset': [Function, Array] as PropType<(offset: Position) => void>,
  onDragStart: [Function, Array] as PropType<MaybeArray<(args: ElementEventBasePayload) => void>>,
  onDrag: [Function, Array] as PropType<MaybeArray<(args: ElementEventBasePayload) => void>>,
  onDragEnter: [Function, Array] as PropType<MaybeArray<(args: ElementDropTargetEventBasePayload) => void>>,
  onDragLeave: [Function, Array] as PropType<MaybeArray<(args: ElementDropTargetEventBasePayload) => void>>,
  onDrop: [Function, Array] as PropType<MaybeArray<(args: ElementEventBasePayload) => void>>,
  onDropOfTarget: [Function, Array] as PropType<MaybeArray<(args: ElementDropTargetEventBasePayload) => void>>,
  onOffsetChange: [Function, Array] as PropType<MaybeArray<(newOffset: Position, oldOffset: Position) => void>>,
} as const

export interface DndMovableBindings {
  init: () => void
}
export type DndMovableProps = ExtractInnerPropTypes<typeof dndMovableProps>
export type DndMovablePublicProps = ExtractPublicPropTypes<typeof dndMovableProps>
export type DndMovableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DndMovablePublicProps> & DndMovablePublicProps,
  DndMovableBindings
>
export type DndMovableInstance = InstanceType<DefineComponent<DndMovableProps, DndMovableBindings>>
