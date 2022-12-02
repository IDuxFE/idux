/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, VKey } from '@idux/cdk/utils'
import type { DatePanelProps, DateRangePanelProps } from '@idux/components/date-picker'
import type { SelectData } from '@idux/components/select'
import type { PropType } from 'vue'

export type SelectPanelData = Required<Pick<SelectData, 'key' | 'label'>> & SelectData

export const proSearchSelectPanelProps = {
  value: { type: Array as PropType<VKey[]>, default: undefined },
  dataSource: { type: Array as PropType<SelectPanelData[]>, default: undefined },
  multiple: { type: Boolean, default: false },
  showSelectAll: { type: Boolean, default: true },
  allSelected: Boolean,
  virtual: { type: Boolean, default: false },
  setOnKeyDown: Function as PropType<(onKeyDown: ((evt: KeyboardEvent) => boolean) | undefined) => void>,

  onChange: Function as PropType<(value: VKey[]) => void>,
  onSelectAllClick: Function as PropType<() => void>,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,
} as const
export type ProSearchSelectPanelProps = ExtractInnerPropTypes<typeof proSearchSelectPanelProps>

export const proSearchDatePanelProps = {
  panelType: {
    type: String as PropType<'datePicker' | 'dateRangePicker'>,
    required: true,
  },
  value: { type: [Date, Array] as PropType<Date | Date[]>, default: undefined },
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  defaultOpenValue: [Date, Array] as PropType<Date | Date[]>,
  type: {
    type: String as PropType<DatePanelProps['type']>,
    default: 'date',
  },
  timePanelOptions: [Object, Array] as PropType<
    DatePanelProps['timePanelOptions'] | DateRangePanelProps['timePanelOptions']
  >,
  onChange: Function as PropType<(value: Date | Date[] | undefined) => void>,
  onConfirm: Function as PropType<() => void>,
  onCancel: Function as PropType<() => void>,
} as const
export type ProSearchDatePanelProps = ExtractInnerPropTypes<typeof proSearchDatePanelProps>
