/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type DefineComponent, type HTMLAttributes, type PropType } from 'vue'

import { type ExtractInnerPropTypes, type ExtractPublicPropTypes } from '@idux/cdk/utils'

export const dividerProps = {
  dashed: {
    type: Boolean,
    default: undefined,
  },
  label: String,
  labelPlacement: String as PropType<'start' | 'center' | 'end'>,
  plain: {
    type: Boolean,
    default: undefined,
  },
  position: String as PropType<'left' | 'center' | 'right'>,
  size: String as PropType<'sm' | 'md' | 'lg'>,
  type: String as PropType<'horizontal' | 'vertical'>,
  vertical: {
    type: Boolean,
    default: undefined,
  },
} as const

export type DividerProps = ExtractInnerPropTypes<typeof dividerProps>
export type DividerPublicProps = ExtractPublicPropTypes<typeof dividerProps>
export type DividerComponent = DefineComponent<Omit<HTMLAttributes, keyof DividerPublicProps> & DividerPublicProps>
export type DividerInstance = InstanceType<DefineComponent<DividerProps>>
