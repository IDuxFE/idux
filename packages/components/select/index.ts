/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SelectComponent, SelectOptionComponent, SelectOptionGroupComponent } from './src/types'

import Select from './src/Select.vue'
import SelectOption from './src/SelectOption.vue'
import SelectOptionGroup from './src/SelectOptionGroup.vue'

const IxSelect = Select as unknown as SelectComponent
const IxSelectOption = SelectOption as unknown as SelectOptionComponent
const IxSelectOptionGroup = SelectOptionGroup as unknown as SelectOptionGroupComponent

export { IxSelect, IxSelectOption, IxSelectOptionGroup }

export type {
  SelectInstance,
  SelectPublicProps as SelectProps,
  SelectOptionInstance,
  SelectOptionPublicProps as SelectOptionProps,
  SelectOptionGroupInstance,
  SelectOptionGroupPublicProps as SelectOptionGroupProps,
  SelectOption,
  SelectFilterFn,
} from './src/types'
