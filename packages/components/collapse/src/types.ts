/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray, VKey } from '@idux/cdk/utils'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const collapseProps = {
  expandedKeys: Array as PropType<VKey[]>,
  accordion: {
    type: Boolean,
    default: undefined,
  },
  borderless: {
    type: Boolean,
    default: undefined,
  },
  expandIcon: String,
  ghost: {
    type: Boolean,
    default: undefined,
  },

  // events
  'onUpdate:expandedKeys': [Function, Array] as PropType<MaybeArray<<K = VKey>(expandedKeys: K[]) => void>>,
} as const

export type CollapseProps = ExtractInnerPropTypes<typeof collapseProps>
export type CollapsePublicProps = ExtractPublicPropTypes<typeof collapseProps>
export type CollapseComponent = DefineComponent<Omit<HTMLAttributes, keyof CollapsePublicProps> & CollapsePublicProps>
export type CollapseInstance = InstanceType<DefineComponent<CollapseProps>>

export const collapsePanelProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  header: [String, Object] as PropType<string | HeaderProps>,
} as const

export type CollapsePanelProps = ExtractInnerPropTypes<typeof collapsePanelProps>
export type CollapsePanelPublicProps = ExtractPublicPropTypes<typeof collapsePanelProps>
export type CollapsePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CollapsePanelPublicProps> & CollapsePanelPublicProps
>
export type CollapsePanelInstance = InstanceType<DefineComponent<CollapsePanelProps>>
