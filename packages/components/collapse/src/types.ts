import type { DefineComponent, InjectionKey } from 'vue'

export type ActiveKeyType = string | Array<string>

interface CollapseOriginalProps {
  accordion?: boolean
  active?: ActiveKeyType
  borderless?: boolean
}

interface CollapsePanelOriginalProps {
  title?: string
  name: string
  disabled: boolean
  icon?: string[]
}

export const collapseInjectionKey: InjectionKey<CollapseProps> = Symbol()

export type CollapseProps = Readonly<CollapseOriginalProps>

export type CollapseComponent = InstanceType<DefineComponent<CollapseProps>>

export type CollapsePanelProps = Readonly<CollapsePanelOriginalProps>

export type CollapsePanelComponent = InstanceType<DefineComponent<CollapsePanelProps>>
