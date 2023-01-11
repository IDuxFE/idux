/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const badgeProps = {
  /**
   * @deprecated please use `--ix-badge-background-color` instead
   */
  color: { type: String },
  count: { type: [String, Number] as PropType<string | number>, default: 0 },
  dot: { type: [Boolean, String] as PropType<boolean | 'inline'>, default: undefined },
  overflowCount: { type: [String, Number] as PropType<string | number> },
  showZero: { type: Boolean, default: undefined },
  status: { type: String as PropType<'success' | 'info' | 'error' | 'warning'>, default: 'error' },
  title: { type: String },
} as const

export type BadgeProps = ExtractInnerPropTypes<typeof badgeProps>
export type BadgePublicProps = ExtractPublicPropTypes<typeof badgeProps>
export type BadgeComponent = DefineComponent<Omit<HTMLAttributes, keyof BadgePublicProps> & BadgePublicProps>
export type BadgeInstance = InstanceType<DefineComponent<BadgeProps>>

export const badgeSubProps = {
  count: { type: Number, required: true },
  dot: { type: Boolean, required: true },
  overflowCount: { type: Number, required: true },
  prefixCls: { type: String, required: true },
  showZero: { type: Boolean, required: true },
  status: { type: String as PropType<'success' | 'info' | 'error' | 'warning'>, required: true },
  text: { type: String },
  title: { type: String },
} as const
