import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export type ActiveKeyType = string | Array<string>

export const collapseProps = {
  accordion: IxPropTypes.bool,
  active: IxPropTypes.oneOfType([String, IxPropTypes.arrayOf(String)]).def([]),
  borderless: IxPropTypes.bool.def(false),
}

export type CollapseProps = IxInnerPropTypes<typeof collapseProps>
export type CollapsePublicProps = IxPublicPropTypes<typeof collapseProps>
export type CollapseComponent = DefineComponent<HTMLAttributes & typeof collapseProps>
export type CollapseInstance = InstanceType<DefineComponent<CollapseProps>>

export const collapsePanelProps = {
  name: IxPropTypes.string.isRequired,
  title: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.arrayOf(String),
}

export type CollapsePanelProps = IxInnerPropTypes<typeof collapsePanelProps>
export type CollapsePanelPublicProps = IxPublicPropTypes<typeof collapsePanelProps>
export type CollapsePanelComponent = DefineComponent<HTMLAttributes & typeof collapsePanelProps>
export type CollapsePanelInstance = InstanceType<DefineComponent<CollapsePanelProps>>
