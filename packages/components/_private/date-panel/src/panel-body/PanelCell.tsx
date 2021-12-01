/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from '../types'

import { computed, defineComponent, inject, normalizeClass } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { datePanelToken } from '../token'
import { panelCellProps } from '../types'

const dayTypes: DatePanelType[] = ['date', 'week']
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

    const offsetIndex = computed(() => props.rowIndex * maxCellIndex.value + props.cellIndex)
    const cellDate = computed(() => {
      const currType = activeType.value
      const offsetUnit = dayTypes.includes(currType) ? 'day' : currType
      return dateConfig.add(startActiveDate.value, offsetIndex.value, offsetUnit as 'day')
    })
    const isDisabled = computed(() => panelProps.disabledDate?.(cellDate.value))
    const isSelected = computed(() => {
      const currValue = panelProps.value
      return currValue && dateConfig.isSame(currValue, cellDate.value, activeType.value)
    })
    const isToday = computed(
      () => dayTypes.includes(activeType.value) && dateConfig.isSame(cellDate.value, dateConfig.now(), 'day'),
    )
    const outView = computed(() => {
      const currType = activeType.value
      if (dayTypes.includes(activeType.value)) {
        return !dateConfig.isSame(cellDate.value, activeDate.value, 'month')
      }
      if (currType === 'year') {
        const offset = offsetIndex.value
        return offset === 0 || offset === maxRowIndex.value * maxCellIndex.value
      }
      return false
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-cell`
      if (props.isWeek) {
        return normalizeClass({
          [prefixCls]: true,
          [`${prefixCls}-selected`]: isSelected.value,
          [`${prefixCls}-week-number`]: true,
        })
      }
      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: isDisabled.value,
        [`${prefixCls}-selected`]: isSelected.value,
        [`${prefixCls}-today`]: isToday.value,
        [`${prefixCls}-out-view`]: outView.value,
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
      if (props.isWeek) {
        return (
          <td class={classes.value} role="gridcell">
            {format(currDate, 'ww')}
          </td>
        )
      }

      const cellNode = slots.cell?.({ date: currDate }) ?? (
        <div class={`${mergedPrefixCls.value}-cell-inner`}>{format(currDate, labelFormat[activeType.value])}</div>
      )
      return (
        <td
          class={classes.value}
          role="gridcell"
          onClick={isDisabled.value ? undefined : handleClick}
          onMouseenter={isDisabled.value ? undefined : handleMouseenter}
        >
          {cellNode}
        </td>
      )
    }
  },
})
