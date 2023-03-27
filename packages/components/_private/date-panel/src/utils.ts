/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from './types'
import type { DateConfig } from '@idux/components/config'

export type PanelCellType = Exclude<DatePanelType, 'week'>

export function getPanelCellType(type: DatePanelType): PanelCellType {
  return type === 'week' ? 'date' : type
}

export function getPanelCellDisabled(
  cellDate: Date,
  panelType: DatePanelType,
  dateConfig: DateConfig,
  disabledDate: (date: Date) => boolean,
): boolean {
  const cellType = getPanelCellType(panelType)
  if (cellType === 'date') {
    return disabledDate(cellDate)
  }

  const scopesMap: Record<PanelCellType, 'date' | 'month' | 'quarter' | undefined> = {
    date: undefined,
    month: 'date',
    quarter: 'month',
    year: 'quarter',
  }

  const stack: { date: Date; type: PanelCellType }[] = []
  const pushStacks = (date: Date, type: PanelCellType) => {
    const scope = scopesMap[type]
    if (!scope) {
      return
    }

    const [start, end] = (['startOf', 'endOf'] as const).map(fn => dateConfig.get(dateConfig[fn](date, type), scope))
    for (let i = start; i <= end; i++) {
      stack.push({
        date: dateConfig.set(date, i, scope),
        type: scope,
      })
    }
  }

  pushStacks(cellDate, cellType)

  while (stack.length) {
    const item = stack.pop()!

    if (!disabledDate(item.date)) {
      return false
    }

    pushStacks(item.date, item.type)
  }

  return true
}
