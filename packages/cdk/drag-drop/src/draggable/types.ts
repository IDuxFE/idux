/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { Component, DefineComponent, HTMLAttributes, PropType } from 'vue'

import { BoundaryType, DnDBackendType, DnDEvent } from '../types'

export const draggableProps = {
  /**
   * 拖拽底层实现
   * * `native`: using html5 drag-drop api
   * * `pointer`: using mouse/touch position to simulate
   */
  backend: { type: String as PropType<DnDBackendType>, default: 'native' },
  /**
   *  元素可拖拽的区域
   *
   *  @default 拖拽区域
   */
  boundary: { type: [String, Object] as PropType<BoundaryType>, default: 'parent' },
  /**
   * 是否禁用
   *
   * @default false
   */
  disabled: { type: Boolean, default: false },
  /**
   * 是否自由拖拽
   *
   * @default: false
   */
  free: { type: Boolean, default: false },
  /**
   * 拖拽的元素或者组件
   *
   * @default div
   */
  is: { type: [String, Object] as PropType<string | Component>, default: 'div' },

  onDragStart: [Function, Array] as PropType<MaybeArray<DnDEvent>>,
  onDrag: [Function, Array] as PropType<MaybeArray<DnDEvent>>,
  onDragEnd: [Function, Array] as PropType<MaybeArray<DnDEvent>>,
} as const

export type DraggableProps = ExtractInnerPropTypes<typeof draggableProps>
export type DraggablePublicProps = ExtractPublicPropTypes<typeof draggableProps>
export type DraggableComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DraggablePublicProps> & DraggablePublicProps
>
export type DraggableInstance = InstanceType<DefineComponent<DraggableProps>>
