import type { DefineComponent, HTMLAttributes } from 'vue'
import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'

import { IxPropTypes } from '@idux/cdk/utils'

export const switchProps = {
  checked: IxPropTypes.bool.def(false),
  disabled: IxPropTypes.bool.def(false),
  checkedChildren: IxPropTypes.string.def(''),
  unCheckedChildren: IxPropTypes.string.def(''),
  size: IxPropTypes.oneOf(['medium', 'small'] as const).def('medium'),
  loading: IxPropTypes.bool.def(false),
}

export type SwitchProps = IxInnerPropTypes<typeof switchProps>
export type SwitchPublicProps = IxPublicPropTypes<typeof switchProps>
export interface SwitchBindings {
  focus: (options?: FocusOptions) => void
  blur: () => void
}
export type SwitchComponent = DefineComponent<HTMLAttributes & typeof switchProps, SwitchBindings>
export type SwitchInstance = InstanceType<DefineComponent<SwitchProps, SwitchBindings>>
