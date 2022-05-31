/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SelectComponent, SelectPanelComponent } from './src/types'

import Select from './src/Select'
import { SelectOption, SelectOptionGroup } from './src/option'
import Panel from './src/panel/Panel'

const IxSelect = Select as unknown as SelectComponent
const IxSelectPanel = Panel as unknown as SelectPanelComponent
const IxSelectOption = SelectOption
const IxSelectOptionGroup = SelectOptionGroup

export { IxSelect, IxSelectPanel, IxSelectOption, IxSelectOptionGroup }
export { useOverlayState as ɵUseOverlayState } from './src/composables/useOverlayState'

export type {
  SelectInstance,
  SelectComponent,
  SelectPublicProps as SelectProps,
  SelectPanelInstance,
  SelectPanelComponent,
  SelectPanelPublicProps as SelectPanelProps,
  SelectOptionProps,
  SelectOptionComponent,
  SelectOptionGroupProps,
  SelectOptionGroupComponent,
  SelectData,
  SelectSearchFn,
} from './src/types'
