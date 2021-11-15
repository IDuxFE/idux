/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes, VKey } from '@idux/cdk/utils'
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
  'onUpdate:expandedKeys': IxPropTypes.emit<(expandedKeys: VKey[]) => void>(),
}

export type CollapseProps = IxInnerPropTypes<typeof collapseProps>
export type CollapsePublicProps = IxPublicPropTypes<typeof collapseProps>
export type CollapseComponent = DefineComponent<Omit<HTMLAttributes, keyof CollapsePublicProps> & CollapsePublicProps>
export type CollapseInstance = InstanceType<DefineComponent<CollapseProps>>

export const collapsePanelProps = {
  disabled: IxPropTypes.bool.def(false),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
}

export type CollapsePanelProps = IxInnerPropTypes<typeof collapsePanelProps>
export type CollapsePanelPublicProps = IxPublicPropTypes<typeof collapsePanelProps>
export type CollapsePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof CollapsePanelPublicProps> & CollapsePanelPublicProps
>
export type CollapsePanelInstance = InstanceType<DefineComponent<CollapsePanelProps>>
