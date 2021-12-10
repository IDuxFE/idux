/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectComponent } from './src/types'

import Select from './src/Select'
import { SelectOption, SelectOptionGroup } from './src/option'

const IxSelect = Select as unknown as SelectComponent
const IxSelectOption = SelectOption
const IxSelectOptionGroup = SelectOptionGroup

export { IxSelect, IxSelectOption, IxSelectOptionGroup }

export type {
  SelectInstance,
  SelectComponent,
  SelectPublicProps as SelectProps,
  SelectOptionPublicProps as SelectOptionProps,
  SelectOptionGroupPublicProps as SelectOptionGroupProps,
  SelectOption,
  SelectFilterFn,
} from './src/types'

export type SelectOptionComponent = typeof IxSelectOption
export type SelectOptionGroupComponent = typeof IxSelectOptionGroup
