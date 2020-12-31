import { installComponent } from '@idux/components/utils'
import IxRadio from './src/Radio.vue'
import IxRadioButton from './src/RadioButton.vue'

import IxRadioGroup from './src/RadioGroup.vue'

IxRadio.install = installComponent(IxRadio)
IxRadioGroup.install = installComponent(IxRadioGroup)
IxRadioButton.install = installComponent(IxRadioButton)

export { IxRadio, IxRadioButton, IxRadioGroup }
export type {
  IxRadioComponent,
  RadioProps,
  IxRadioButtonComponent,
  RadioButtonProps,
  IxRadioGroupComponent,
  RadioGroupProps,
} from './src/types'
