/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { TooltipProps } from '@idux/components/tooltip'
import type { Component, DefineComponent, HTMLAttributes, PropType, VNodeChild } from 'vue'

export type TextCopyIconRenderer = (options: { copied: boolean }) => VNodeChild | string
export type TextExpandIconRenderer = (options: { expanded: boolean }) => VNodeChild | string
export interface TextEllipsis {
  rows?: number
  expandable?: boolean
}

export const textProps = {
  copyable: { type: Boolean, default: false },
  copyIcon: {
    type: [String, Function, Array] as PropType<string | TextCopyIconRenderer | [string, string]>,
    default: undefined,
  },
  copyTooltip: {
    type: [Boolean, Array, Object] as PropType<
      boolean | [string, string] | [TooltipProps, TooltipProps] | TooltipProps
    >,
    default: true,
  },

  expanded: { type: Boolean, default: undefined },

  /**
   * @deprecated please use `ellipsis` instead
   */
  expandable: { type: Boolean, default: undefined },
  expandIcon: {
    type: [String, Function, Array] as PropType<string | TextExpandIconRenderer | [string, string]>,
    default: undefined,
  },

  ellipsis: { type: [Boolean, Object] as PropType<boolean | TextEllipsis>, default: undefined },

  /**
   * @deprecated please use `ellipsis` instead
   */
  lineClamp: { type: [String, Number] as PropType<string | number>, default: undefined },
  tag: { type: [String, Object] as PropType<string | Component>, default: 'span' },
  tooltip: { type: [Boolean, String, Object] as PropType<boolean | 'native' | TooltipProps>, default: true },

  // events
  onCopy: [Function, Array] as PropType<MaybeArray<(success: boolean, text: string) => void>>,
  'onUpdate:expanded': [Function, Array] as PropType<MaybeArray<(expanded: boolean) => void>>,
} as const

export type TextProps = ExtractInnerPropTypes<typeof textProps>
export type TextPublicProps = ExtractPublicPropTypes<typeof textProps>
export type TextComponent = DefineComponent<Omit<HTMLAttributes, keyof TextPublicProps> & TextPublicProps>
export type TextInstance = InstanceType<DefineComponent<TextProps>>
