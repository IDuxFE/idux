/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { DatePanelType } from '../types'
import type { DateConfig } from '@idux/components/config'
import type { DatePickerLocale } from '@idux/components/i18n'
import type { ComputedRef } from 'vue'

import { computed, defineComponent, inject } from 'vue'

import { IxIcon } from '@idux/components/icon'

import { datePanelToken } from '../token'

const hidePrevNextTypes: DatePanelType[] = ['month', 'quarter', 'year']

export default defineComponent({
  setup() {
    const { locale, mergedPrefixCls, dateConfig, activeDate, setActiveDate, activeType, setActiveType } =
      inject(datePanelToken)!

    const contents = useContents(activeType, activeDate, locale, dateConfig, setActiveType)

    const handleSuperPrevClick = () => {
      const offsetYear = activeType.value === 'year' ? -10 : -1
      setActiveDate(dateConfig.add(activeDate.value, offsetYear, 'year'))
    }

    const handlePrevClick = () => {
      setActiveDate(dateConfig.add(activeDate.value, -1, 'month'))
    }

    const handleSuperNextClick = () => {
      const offsetYear = activeType.value === 'year' ? 10 : 1
      setActiveDate(dateConfig.add(activeDate.value, offsetYear, 'year'))
    }

    const handleNextClick = () => {
      setActiveDate(dateConfig.add(activeDate.value, 1, 'month'))
    }

    return () => {
      const { previousDecade, previousYear, previousMonth, nextDecade, nextYear, nextMonth } = locale.value
      const currType = activeType.value
      const superPrev = true
      const prev = !hidePrevNextTypes.includes(activeType.value)
      const superNext = true
      const next = !hidePrevNextTypes.includes(activeType.value)

      const contentNodes = contents.value.map(item => {
        const { label, ...rest } = item
        return (
          <button type="button" tabindex="-1" {...rest}>
            {label}
          </button>
        )
      })

      const prefixCls = `${mergedPrefixCls.value}-header`
      return (
        <div class={prefixCls}>
          <button
            class={`${prefixCls}-super-prev${superPrev ? ' visible' : ''}`}
            type="button"
            tabindex="-1"
            title={currType === 'year' ? previousDecade : previousYear}
            onClick={handleSuperPrevClick}
          >
            <IxIcon name="double-left" />
          </button>
          <button
            class={`${prefixCls}-prev${prev ? ' visible' : ''}`}
            type="button"
            tabindex="-1"
            title={previousMonth}
            onClick={handlePrevClick}
          >
            <IxIcon name="left" />
          </button>
          <div class={`${prefixCls}-content`}>{contentNodes}</div>
          <button
            class={`${prefixCls}-super-next${next ? ' visible' : ''}`}
            type="button"
            tabindex="-1"
            title={nextMonth}
            onClick={handleNextClick}
          >
            <IxIcon name="right" />
          </button>
          <button
            class={`${prefixCls}-super-prev${superNext ? ' visible' : ''}`}
            type="button"
            tabindex="-1"
            title={currType === 'year' ? nextDecade : nextYear}
            onClick={handleSuperNextClick}
          >
            <IxIcon name="double-right" />
          </button>
        </div>
      )
    }
  },
})

function useContents(
  activeType: ComputedRef<DatePanelType>,
  activeDate: ComputedRef<Date>,
  locale: ComputedRef<DatePickerLocale>,
  dateConfig: DateConfig,
  setActiveType: (type: DatePanelType) => void,
) {
  const handleClick = (evt: Event, type: DatePanelType) => {
    evt.stopPropagation()
    setActiveType(type)
  }
  return computed(() => {
    const currType = activeType.value
    const currDate = activeDate.value
    const { yearSelect, monthSelect, yearFormat, monthFormat } = locale.value
    const { format, get } = dateConfig
    switch (currType) {
      case 'date':
      case 'week':
        return [
          {
            key: 'year',
            title: yearSelect,
            onClick: (evt: Event) => handleClick(evt, 'year'),
            label: format(currDate, yearFormat),
          },
          {
            key: 'month',
            title: monthSelect,
            onClick: (evt: Event) => handleClick(evt, 'month'),
            label: format(currDate, monthFormat),
          },
        ]
      case 'month':
      case 'quarter':
        return [
          {
            key: 'year',
            title: yearSelect,
            onClick: (evt: Event) => handleClick(evt, 'year'),
            label: format(currDate, yearFormat),
          },
        ]
      case 'year': {
        const startYear = parseInt(`${get(currDate, 'year') / 10}`, 10) * 10
        const endYear = startYear + 9
        return [{ key: 'decade', label: `${startYear}-${endYear}` }]
      }
      default:
        return []
    }
  })
}
