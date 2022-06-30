/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, VKey } from '@idux/cdk/utils'
import type { HeaderProps } from '@idux/components/header'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const collapseProps = {
  expandedKeys: IxPropTypes.array<VKey>(),
  accordion: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
  expandIcon: IxPropTypes.string,
  ghost: IxPropTypes.bool,

  // events
  'onUpdate:expandedKeys': IxPropTypes.emit<<K = VKey>(expandedKeys: K[]) => void>(),
}

export type CollapseProps = ExtractInnerPropTypes<typeof collapseProps>
export type CollapsePublicProps = ExtractPublicPropTypes<typeof collapseProps>
export type CollapseComponent = DefineComponent<Omit<HTMLAttributes, keyof CollapsePublicProps> & CollapsePublicProps>
export type CollapseInstance = InstanceType<DefineComponent<CollapseProps>>

export const collapsePanelProps = {
  disabled: IxPropTypes.bool.def(false),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
}

export type CollapsePanelProps = ExtractInnerPropTypes<typeof collapsePanelProps>
export type CollapsePanelPublicProps = ExtractPublicPropTypes<typeof collapsePanelProps>
export type CollapsePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CollapsePanelPublicProps> & CollapsePanelPublicProps
>
export type CollapsePanelInstance = InstanceType<DefineComponent<CollapsePanelProps>>
