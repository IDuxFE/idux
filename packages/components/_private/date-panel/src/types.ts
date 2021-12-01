/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { IxInnerPropTypes, IxPublicPropTypes } from '@idux/cdk/utils'
import type { DefineComponent, HTMLAttributes } from 'vue'

import { IxPropTypes } from '@idux/cdk/utils'

export const datePanelProps = {
  disabledDate: IxPropTypes.func<(date: Date) => boolean>(),
  type: IxPropTypes.oneOf<DatePanelType>(['date', 'week', 'month', 'quarter', 'year']).def('date'),
  value: IxPropTypes.object<Date>(),
  visible: IxPropTypes.bool,

  onCellClick: IxPropTypes.emit<(date: Date) => void>(),
  onCellMouseenter: IxPropTypes.emit<(date: Date) => void>(),
}

export type DatePanelProps = IxInnerPropTypes<typeof datePanelProps>
export type DatePanelPublicProps = IxPublicPropTypes<typeof datePanelProps>
export type DatePanelComponent = DefineComponent<
  Omit<HTMLAttributes, keyof DatePanelPublicProps> & DatePanelPublicProps
>
export type DatePanelInstance = InstanceType<DefineComponent<DatePanelProps>>

export type DatePanelType = 'date' | 'week' | 'month' | 'quarter' | 'year'

// private
export const panelRowProps = {
  rowIndex: IxPropTypes.number.isRequired,
}

export const panelCellProps = {
  rowIndex: IxPropTypes.number.isRequired,
  cellIndex: IxPropTypes.number.isRequired,
  isWeek: IxPropTypes.bool,
}
