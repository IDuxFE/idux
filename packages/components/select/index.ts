import type { App } from 'vue'

import IxSelect from './src/Select.vue'
import IxOption from './src/Option.vue'
import IxOptionGroup from './src/OptionGroup.vue'

IxSelect.install = (app: App): void => {
  app.component(IxSelect.name, IxSelect)
}

IxOption.install = (app: App): void => {
  app.component(IxOption.name, IxOption)
}

IxOptionGroup.install = (app: App): void => {
  app.component(IxOptionGroup.name, IxOptionGroup)
}

export { IxSelect, IxOption, IxOptionGroup }

export type {
  SelectComponent,
  SelectProps,
  OptionComponent,
  OptionProps,
  OptionGroupComponent,
  OptionGroupProps,
} from './src/types'
