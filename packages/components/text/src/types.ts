/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes } from '@idux/cdk/utils'
import type { TooltipProps } from '@idux/components/tooltip'
import type { Component, DefineComponent, HTMLAttributes, PropType } from 'vue'

export const textProps = {
  copyable: { type: Boolean, default: false },
  expandable: { type: Boolean, default: false },
  lineClamp: { type: [String, Number] as PropType<string | number>, default: undefined },
  tag: { type: [String, Object] as PropType<string | Component>, default: 'span' },
  tooltip: { type: [Boolean, String, Object] as PropType<boolean | 'native' | TooltipProps>, default: true },
} as const

export type TextProps = ExtractInnerPropTypes<typeof textProps>
export type TextPublicProps = ExtractPublicPropTypes<typeof textProps>
export type TextComponent = DefineComponent<Omit<HTMLAttributes, keyof TextPublicProps> & TextPublicProps>
export type TextInstance = InstanceType<DefineComponent<TextProps>>
