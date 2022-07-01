/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export type TagShape = 'round' | 'rect'

export const tagProps = {
  color: String,
  icon: String,
  number: Number,
  shape: String as PropType<TagShape>,
}

export type TagProps = ExtractInnerPropTypes<typeof tagProps>
export type TagPublicProps = ExtractPublicPropTypes<typeof tagProps>
export type TagComponent = DefineComponent<Omit<HTMLAttributes, keyof TagPublicProps> & TagPublicProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>

export interface TagData<K = VKey> extends Omit<TagProps, 'shape'> {
  key?: K
  label?: string
}

export const tagGroupProps = {
  activeKeys: {
    type: Array as PropType<VKey[]>,
    default: (): VKey[] => [],
  },
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
  dataSource: Array as PropType<TagData[]>,
  gap: [Number, String],
  wrap: {
    type: Boolean,
    default: undefined,
  },
  shape: String as PropType<TagShape>,
  'onUpdate:activeKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(activeKeys: K[]) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(key: K, evt: MouseEvent) => void>>,
  onClose: [Function, Array] as PropType<MaybeArray<(key: K, evt: MouseEvent) => void>>,
}

export type TagGroupProps = ExtractInnerPropTypes<typeof tagGroupProps>
export type TagGroupPublicProps = ExtractPublicPropTypes<typeof tagGroupProps>
export type TagGroupComponent = DefineComponent<Omit<HTMLAttributes, keyof TagGroupPublicProps> & TagGroupPublicProps>
export type TagGroupInstance = InstanceType<DefineComponent<TagGroupProps>>
