/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { ExtractInnerPropTypes, ExtractPublicPropTypes, MaybeArray } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes, PropType } from 'vue'

export const datePanelProps = {
  cellTooltip: Function as PropType<(cell: { value: Date; disabled: boolean }) => string | void>,
  disabledDate: Function as PropType<(date: Date) => boolean>,
  type: {
    type: String as PropType<DatePanelType>,
    default: 'date',
  },
  value: [Date, Array] as PropType<Date | (Date | undefined)[]>,
  activeDate: Date,
  visible: {
    type: Boolean,
    default: undefined,
  },
  isSelecting: {
    type: Boolean,
    default: undefined,
  },

  onCellClick: [Function, Array] as PropType<MaybeArray<(date: Date) => void>>,
  onCellMouseenter: [Function, Array] as PropType<MaybeArray<(date: Date) => void>>,
  'onUpdate:activeDate': [Function, Array] as PropType<MaybeArray<(date: Date) => void>>,
}

export type DatePanelProps = ExtractInnerPropTypes<typeof datePanelProps>
export type DatePanelPublicProps = ExtractPublicPropTypes<typeof datePanelProps>
export type DatePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DatePanelPublicProps> & DatePanelPublicProps
>
export type DatePanelInstance = InstanceType<DefineComponent<DatePanelProps>>

export type DatePanelType = 'date' | 'week' | 'month' | 'quarter' | 'year'

// private
export const panelRowProps = {
  rowIndex: {
    type: Number,
    required: true,
  },
}

export const panelCellProps = {
  rowIndex: {
    type: Number,
    required: true,
  },
  cellIndex: {
    type: Number,
    required: true,
  },
}
