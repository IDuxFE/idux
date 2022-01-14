/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { type SelectOptionComponent, type SelectOptionGroupComponent } from './types'

const optionKey = '__IDUX_SELECT_OPTION'
const SelectOption = (() => {}) as SelectOptionComponent
SelectOption.displayName = 'IxSelectOption'
;(SelectOption as any)[optionKey] = true

const optionGroupKey = '__IDUX_SELECT_OPTION_GROUP'
const SelectOptionGroup = (() => {}) as SelectOptionGroupComponent
SelectOptionGroup.displayName = 'IxSelectOptionGroup'
;(SelectOptionGroup as any)[optionGroupKey] = true

export { SelectOption, SelectOptionGroup, optionKey, optionGroupKey }
