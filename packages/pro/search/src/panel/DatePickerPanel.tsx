/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { defineComponent, inject } from 'vue'

import { useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import {
  type DatePanelProps,
  type DateRangePanelProps,
  IxDatePanel,
  IxDateRangePanel,
} from '@idux/components/date-picker'

import { proSearchContext } from '../token'
import { searchDatePickerPanelProps } from '../types'

export default defineComponent({
  props: searchDatePickerPanelProps,
  setup(props) {
    const { locale, mergedPrefixCls } = inject(proSearchContext)!
    const [visiblePanel, setVisiblePanel] = useState<DatePanelProps['visible']>('datePanel')

    const handleChange = (value: Date | undefined) => {
      props.onChange?.(value)
    }

    const handleSwitchPanelClick = () => {
      setVisiblePanel(visiblePanel.value === 'datePanel' ? 'timePanel' : 'datePanel')
    }
    const handleConfirm = () => {
      props.onConfirm?.()
    }
    const handleCancel = () => {
      props.onCancel?.()
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-date-picker-panel`

      const panelProps = {
        cellToolTip: props.cellTooltip,
        disabledDate: props.disabledDate,
        value: props.value,
        defaultOpenValue: props.defaultOpenValue,
        type: props.type,
        timePanelOptions: props.timePanelOptions,
        visible: visiblePanel.value,
        onChange: handleChange,
      }

      return (
        <div class={prefixCls} tabindex={-1} onMousedown={evt => evt.preventDefault()}>
          <div class={`${prefixCls}-body`}>
            {props.panelType === 'datePicker' ? (
              <IxDatePanel {...(panelProps as DatePanelProps)} />
            ) : (
              <IxDateRangePanel {...(panelProps as DateRangePanelProps)} />
            )}
          </div>
          <div class={`${prefixCls}-footer`}>
            {props.type === 'datetime' && (
              <IxButton mode="text" size="xs" onClick={handleSwitchPanelClick}>
                {visiblePanel.value === 'datePanel' ? locale.switchToTimePanel : locale.switchToDatePanel}
              </IxButton>
            )}
            <IxButton mode="primary" size="xs" onClick={handleConfirm}>
              {locale.ok}
            </IxButton>
            <IxButton size="xs" onClick={handleCancel}>
              {locale.cancel}
            </IxButton>
          </div>
        </div>
      )
    }
  },
})
