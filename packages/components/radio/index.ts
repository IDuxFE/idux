import type { RadioComponent, RadioGroupComponent } from './src/types'

import Radio from './src/Radio'
import RadioGroup from './src/RadioGroup'

const IxRadio = Radio as unknown as RadioComponent
const IxRadioGroup = RadioGroup as unknown as RadioGroupComponent

export { IxRadio, IxRadioGroup }

export type {
  RadioInstance,
  RadioPublicProps as RadioProps,
  RadioGroupInstance,
  RadioGroupPublicProps as RadioGroupProps,
  RadioMode,
  RadioOptions,
} from './src/types'
