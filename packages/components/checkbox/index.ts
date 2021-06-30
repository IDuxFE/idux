import type { CheckboxComponent, CheckboxGroupComponent } from './src/types'

import Checkbox from './src/Checkbox.vue'
import CheckboxGroup from './src/CheckboxGroup.vue'

const IxCheckbox = Checkbox as unknown as CheckboxComponent
const IxCheckboxGroup = CheckboxGroup as unknown as CheckboxGroupComponent

export { IxCheckbox, IxCheckboxGroup }

export type {
  CheckboxInstance,
  CheckboxPublicProps as CheckboxProps,
  CheckboxGroupInstance,
  CheckboxGroupPublicProps as CheckboxGroupProps,
} from './src/types'
