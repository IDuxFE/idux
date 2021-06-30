import type { RadioComponent, RadioButtonComponent, RadioGroupComponent } from './src/types'

import Radio from './src/Radio.vue'
import RadioButton from './src/RadioButton.vue'
import RadioGroup from './src/RadioGroup.vue'

const IxRadio = Radio as unknown as RadioComponent
const IxRadioButton = RadioButton as unknown as RadioButtonComponent
const IxRadioGroup = RadioGroup as unknown as RadioGroupComponent

export { IxRadio, IxRadioButton, IxRadioGroup }

export type {
  RadioInstance,
  RadioPublicProps as RadioProps,
  RadioButtonInstance,
  RadioButtonPublicProps as RadioButtonProps,
  RadioGroupInstance,
  RadioGroupPublicProps as RadioGroupProps,
} from './src/types'
