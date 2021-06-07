import type { DefineComponent } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const collapseProps = {
  accordion: IxPropTypes.bool,
  active: IxPropTypes.oneOfType([String, IxPropTypes.arrayOf(String)]).def([]),
  borderless: IxPropTypes.bool.def(false),
}

export type CollapseProps = IxExtractPropTypes<typeof collapseProps>

export type CollapseInstance = InstanceType<DefineComponent<CollapseProps>>

export const collapsePanelProps = {
  name: IxPropTypes.string.isRequired,
  title: IxPropTypes.string,
  disabled: IxPropTypes.bool.def(false),
  icon: IxPropTypes.arrayOf(String),
}

export type CollapsePanelProps = IxExtractPropTypes<typeof collapsePanelProps>

export type CollapsePanelInstance = InstanceType<DefineComponent<CollapsePanelProps>>

export type ActiveKeyType = string | Array<string>
