import type { DefineComponent } from 'vue'

export interface SwitchProps {
  checked?: boolean
  checkedChildren?: string
  unCheckedChildren?: string
  disabled?: boolean
  size?: 'normal' | 'small'
  loading: boolean
}
export interface SwitchBindings {
  switchRef: Ref<HTMLButtonElement>
  focus: (options?: FocusOptions | undefined) => void
  blur: () => void
}
export type SwitchComponent = InstanceType<DefineComponent<SwitchProps, SwitchBindings>>
