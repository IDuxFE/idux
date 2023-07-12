/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type TagShape = 'round' | 'rect'
export type TagStatus = 'normal' | 'success' | 'info' | 'warning' | 'risk' | 'error' | 'fatal'

export const tagProps = {
  bordered: { type: Boolean, default: undefined },
  /**
   * @deprecated please use `status` or `--ix-tag-color, --ix-tag-background-color` instead
   */
  color: String,
  filled: { type: Boolean, default: undefined },
  icon: String,
  number: Number,
  shape: String as PropType<TagShape>,
  status: { type: String as PropType<TagStatus>, default: 'normal' },
} as const

export type TagProps = ExtractInnerPropTypes<typeof tagProps>
export type TagPublicProps = ExtractPublicPropTypes<typeof tagProps>
export type TagComponent = DefineComponent<Omit<HTMLAttributes, keyof TagPublicProps> & TagPublicProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>

export interface TagData<K = VKey> extends Omit<TagPublicProps, 'shape'> {
  key?: K
  label?: string
}

export const tagGroupProps = {
  activeKeys: {
    type: Array as PropType<VKey[]>,
    default: (): VKey[] => [],
  },
  bordered: { type: Boolean, default: undefined },
  clickable: {
    type: Boolean,
    default: false,
  },
  closable: {
    type: Boolean,
    default: false,
  },
  closeIcon: {
    type: String,
    default: 'close',
  },
  filled: { type: Boolean, default: undefined },
  dataSource: Array as PropType<TagData[]>,
  gap: [Number, String] as PropType<number | string>,
  wrap: { type: Boolean, default: undefined },
  shape: String as PropType<TagShape>,
  'onUpdate:activeKeys': [Function, Array] as PropType<MaybeArray<(keys: any[]) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(key: any, evt: MouseEvent) => void>>,
  onClose: [Function, Array] as PropType<MaybeArray<(key: any) => void | boolean | Promise<boolean>>>,
} as const

export type TagGroupProps = ExtractInnerPropTypes<typeof tagGroupProps>
export type TagGroupPublicProps = ExtractPublicPropTypes<typeof tagGroupProps>
export type TagGroupComponent = DefineComponent<Omit<HTMLAttributes, keyof TagGroupPublicProps> & TagGroupPublicProps>
export type TagGroupInstance = InstanceType<DefineComponent<TagGroupProps>>
