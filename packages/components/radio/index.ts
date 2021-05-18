import type { App } from 'vue'
import IxRadio from './src/Radio.vue'
import IxRadioButton from './src/RadioButton.vue'

import IxRadioGroup from './src/RadioGroup.vue'

IxRadio.install = (app: App): void => {
  app.component(IxRadio.name, IxRadio)
}

IxRadioGroup.install = (app: App): void => {
  app.component(IxRadioGroup.name, IxRadioGroup)
}

IxRadioButton.install = (app: App): void => {
  app.component(IxRadioGroup.name, IxRadioGroup)
}

export { IxRadio, IxRadioButton, IxRadioGroup }
export type {
  RadioInstance,
  RadioProps,
  RadioButtonInstance,
  RadioButtonProps,
  RadioGroupInstance,
  RadioGroupProps,
} from './src/types'
