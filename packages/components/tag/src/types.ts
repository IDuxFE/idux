/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export type TagShape = 'round' | 'rect'

export const tagProps = {
  color: IxPropTypes.string,
  icon: IxPropTypes.string,
  number: IxPropTypes.number,
  shape: IxPropTypes.oneOf<TagShape>(['round', 'rect']),
}

export type TagProps = ExtractInnerPropTypes<typeof tagProps>
export type TagPublicProps = ExtractPublicPropTypes<typeof tagProps>
export type TagComponent = DefineComponent<Omit<HTMLAttributes, keyof TagPublicProps> & TagPublicProps>
export type TagInstance = InstanceType<DefineComponent<TagProps>>

export interface TagData extends Omit<TagProps, 'shape'> {
  key?: VKey
  label?: string
}

export const tagGroupProps = {
  activeKeys: IxPropTypes.array<VKey>().def(() => []),
  clickable: IxPropTypes.bool.def(false),
  closable: IxPropTypes.bool.def(false),
  closeIcon: IxPropTypes.string.def('close'),
  dataSource: IxPropTypes.array<TagData>(),
  gap: IxPropTypes.oneOfType([Number, String]),
  wrap: IxPropTypes.bool,
  shape: IxPropTypes.oneOf<TagShape>(['rect', 'round']),
  'onUpdate:activeKeys': IxPropTypes.emit<(activeKeys: VKey[]) => void>(),
  onClick: IxPropTypes.emit<(key: VKey, evt: MouseEvent) => void>(),
  onClose: IxPropTypes.emit<(key: VKey, evt: MouseEvent) => void>(),
}

export type TagGroupProps = ExtractInnerPropTypes<typeof tagGroupProps>
export type TagGroupPublicProps = ExtractPublicPropTypes<typeof tagGroupProps>
export type TagGroupComponent = DefineComponent<Omit<HTMLAttributes, keyof TagGroupPublicProps> & TagGroupPublicProps>
export type TagGroupInstance = InstanceType<DefineComponent<TagGroupProps>>
