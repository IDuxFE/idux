import type { App } from 'vue'

import IxCheckbox from './src/Checkbox.vue'
import IxCheckboxGroup from './src/CheckboxGroup.vue'

IxCheckbox.install = (app: App): void => {
  app.component(IxCheckbox.name, IxCheckbox)
}

IxCheckboxGroup.install = (app: App): void => {
  app.component(IxCheckboxGroup.name, IxCheckboxGroup)
}

export { IxCheckbox, IxCheckboxGroup }

export type { CheckboxComponent, CheckboxProps, CheckboxGroupComponent, CheckboxGroupProps } from './src/types'
