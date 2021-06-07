import type { DefineComponent, Ref } from 'vue'
import { IxExtractPropTypes, IxPropTypes } from '@idux/cdk/utils'

export const switchProps = {
  checked: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  checkedChildren: IxPropTypes.string.def(''),
  unCheckedChildren: IxPropTypes.string.def(''),
  size: IxPropTypes.oneOf(['medium', 'small'] as const).def('medium'),
  loading: IxPropTypes.bool.def(false),
}

export type SwitchProps = IxExtractPropTypes<typeof switchProps>

export interface SwitchBindings {
  switchRef: Ref<HTMLButtonElement>
  focus: (options?: FocusOptions) => void
  blur: () => void
}

export type SwitchInstance = InstanceType<DefineComponent<SwitchProps, SwitchBindings>>
