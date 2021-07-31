import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'
import { controlPropDef } from '@idux/cdk/forms'

export const switchProps = {
  autofocus: IxPropTypes.bool.def(false),
  checked: IxPropTypes.bool.def(false),
  control: controlPropDef,
  disabled: IxPropTypes.bool.def(false),
  checkedChildren: IxPropTypes.string.def(''),
  unCheckedChildren: IxPropTypes.string.def(''),
  size: IxPropTypes.oneOf(['medium', 'small'] as const).def('medium'),
  loading: IxPropTypes.bool.def(false),

  // events
  'onUpdate:checked': IxPropTypes.emit<(checked: boolean) => void>(),
  onChange: IxPropTypes.emit<(checked: boolean) => void>(),
  onBlur: IxPropTypes.emit<(evt: FocusEvent) => void>(),
}

export type SwitchProps = IxInnerPropTypes<typeof switchProps>
export type SwitchPublicProps = IxPublicPropTypes<typeof switchProps>
export interface SwitchBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type SwitchComponent = DefineComponent<HTMLAttributes & typeof switchProps, SwitchBindings>
export type SwitchInstance = InstanceType<DefineComponent<SwitchProps, SwitchBindings>>
