/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { CheckboxComponent, CheckboxGroupComponent } from './src/types'

import Checkbox from './src/Checkbox'
import CheckboxGroup from './src/CheckboxGroup'

const IxCheckbox = Checkbox as unknown as CheckboxComponent
const IxCheckboxGroup = CheckboxGroup as unknown as CheckboxGroupComponent

export { IxCheckbox, IxCheckboxGroup }

export type {
  CheckboxInstance,
  CheckboxPublicProps as CheckboxProps,
  CheckboxGroupInstance,
  CheckboxGroupPublicProps as CheckboxGroupProps,
  CheckboxOption,
} from './src/types'
