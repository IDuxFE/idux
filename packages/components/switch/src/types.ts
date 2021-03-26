import type { DefineComponent, Ref } from 'vue'

export interface SwitchProps {
  checked?: boolean
  checkedChildren?: string
  unCheckedChildren?: string
  disabled?: boolean
  size?: 'medium' | 'small'
  loading: boolean
}
export interface SwitchBindings {
  switchRef: Ref<HTMLButtonElement>
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type SwitchComponent = InstanceType<DefineComponent<SwitchProps, SwitchBindings>>
