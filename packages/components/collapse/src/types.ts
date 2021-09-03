import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { HeaderProps } from '@idux/components/header'

import { IxPropTypes } from '@idux/cdk/utils'

export const collapseProps = {
  expandedKeys: IxPropTypes.array<string | number>().def(() => []),
  accordion: IxPropTypes.bool,
  borderless: IxPropTypes.bool,
  expandIcon: IxPropTypes.string,
  ghost: IxPropTypes.bool,

  // events
  'onUpdate:expandedKeys': IxPropTypes.emit<(activeKeys: (string | number)[]) => void>(),
}

export type CollapseProps = IxInnerPropTypes<typeof collapseProps>
export type CollapsePublicProps = IxPublicPropTypes<typeof collapseProps>
export type CollapseComponent = DefineComponent<HTMLAttributes & typeof collapseProps>
export type CollapseInstance = InstanceType<DefineComponent<CollapseProps>>

export const collapsePanelProps = {
  disabled: IxPropTypes.bool.def(false),
  header: IxPropTypes.oneOfType([String, IxPropTypes.object<HeaderProps>()]),
}

export type CollapsePanelProps = IxInnerPropTypes<typeof collapsePanelProps>
export type CollapsePanelPublicProps = IxPublicPropTypes<typeof collapsePanelProps>
export type CollapsePanelComponent = DefineComponent<HTMLAttributes & typeof collapsePanelProps>
export type CollapsePanelInstance = InstanceType<DefineComponent<CollapsePanelProps>>
