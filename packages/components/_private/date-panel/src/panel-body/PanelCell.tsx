/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from '../types'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { callEmit, convertArray } from '@idux/cdk/utils'
import { DateConfig } from '@idux/components/config'
import { IxTooltip } from '@idux/components/tooltip'

import { datePanelToken } from '../token'
import { panelCellProps } from '../types'
import { getPanelCellDisabled, getPanelCellType } from '../utils'

const labelFormat: Record<DatePanelType, string> = {
  date: 'd',
  week: 'd',
  month: 'MMM',
  quarter: "'Q'Q",
  year: 'yyyy',
}

export default defineComponent({
  props: panelCellProps,
  setup(props) {
    const {
      props: panelProps,
      slots,
      mergedPrefixCls,
      dateConfig,
      activeDate,
      setActiveDate,
      startActiveDate,
      activeType,
      setActiveType,
      maxRowIndex,
      maxCellIndex,
    } = inject(datePanelToken)!

    const offsetIndex = computed(() => props.rowIndex! * maxCellIndex.value + props.cellIndex!)
    const cellDate = computed(() => {
      return dateConfig.add(startActiveDate.value, offsetIndex.value, getPanelCellType(activeType.value))
    })

    const startDate = computed(() => getDateValue(dateConfig, panelProps.value, activeType.value, true))
    const endDate = computed(() => getDateValue(dateConfig, panelProps.value, activeType.value, false))

    const isDisabled = computed(() => {
      const disabledDate = panelProps.disabledDate
      if (!disabledDate) {
        return false
      }

      return getPanelCellDisabled(cellDate.value, activeType.value, dateConfig, disabledDate)
    })
    const cellTooltip = computed(() =>
      panelProps.cellTooltip?.({ value: cellDate.value, disabled: !!isDisabled.value }),
    )
    const isStart = computed(() => startDate.value && dateConfig.isSame(startDate.value, cellDate.value, 'date'))
    const isEnd = computed(() => endDate.value && dateConfig.isSame(endDate.value, cellDate.value, 'date'))
    const isCurrent = computed(() =>
      dateConfig.isSame(cellDate.value, dateConfig.now(), getPanelCellType(activeType.value)),
    )
    const outView = computed(() => {
      const currType = activeType.value
      if (getPanelCellType(activeType.value) === 'date') {
        return !dateConfig.isSame(cellDate.value, activeDate.value, 'month')
      }
      if (currType === 'year') {
        const offset = offsetIndex.value
        return offset === 0 || offset === maxRowIndex.value * maxCellIndex.value
      }
      return false
    })
    const isSelected = computed(() => {
      if (outView.value) {
        return false
      }

      const compareType = getPanelCellType(activeType.value)

      if (panelProps.isSelecting) {
        return startDate.value && dateConfig.isSame(startDate.value, cellDate.value, compareType)
      }

      return (
        (startDate.value && dateConfig.isSame(startDate.value, cellDate.value, compareType)) ||
        (endDate.value && dateConfig.isSame(endDate.value, cellDate.value, compareType))
      )
    })
    const isInRange = computed(() => {
      const compareType = getPanelCellType(activeType.value)
      const cellDateValue = dateConfig.startOf(cellDate.value, compareType).valueOf()

      return (
        !!startDate.value &&
        !!endDate.value &&
        cellDateValue >= dateConfig.startOf(startDate.value, compareType).valueOf() &&
        cellDateValue <= dateConfig.startOf(endDate.value, compareType).valueOf()
      )
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-cell`

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-in-range`]: isInRange.value,
        [`${prefixCls}-current`]: isCurrent.value,
        [`${prefixCls}-out-view`]: outView.value,
        [`${prefixCls}-start`]: isStart.value,
        [`${prefixCls}-end`]: isEnd.value,
      })
    })

    const handleClick = (evt: Event) => {
      evt.stopPropagation()
      const currDate = cellDate.value
      if (panelProps.type !== activeType.value) {
        setActiveType(panelProps.type)
        setActiveDate(currDate)
      } else {
        callEmit(panelProps.onCellClick, currDate)
      }
    }

    const handleMouseenter = () => {
      callEmit(panelProps.onCellMouseenter, cellDate.value)
    }

    return () => {
      const currDate = cellDate.value
      const { format } = dateConfig

      const cellNode = slots.cell?.({ date: currDate }) ?? (
        <div class={`${mergedPrefixCls.value}-cell-inner`}>
          <div class={`${mergedPrefixCls.value}-cell-trigger`}>{format(currDate, labelFormat[activeType.value])}</div>
        </div>
      )
      return (
        <td
          class={classes.value}
          role="gridcell"
          onClick={isDisabled.value ? undefined : handleClick}
          onMouseenter={isDisabled.value ? undefined : handleMouseenter}
        >
          {cellTooltip.value ? <IxTooltip title={cellTooltip.value}>{cellNode}</IxTooltip> : cellNode}
        </td>
      )
    }
  },
})

function getDateValue(
  dateConfig: DateConfig,
  value: Date | (Date | undefined)[] | undefined,
  type: DatePanelType,
  isStart: boolean,
) {
  const valueArr = convertArray(value)
  if (type === 'week') {
    return isStart ? dateConfig.startOf(valueArr[0], 'week') : dateConfig.endOf(valueArr[1] ?? valueArr[0], 'week')
  }

  return valueArr[isStart ? 0 : 1]
}
