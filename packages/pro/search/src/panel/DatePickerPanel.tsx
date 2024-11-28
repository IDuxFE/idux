/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, watch } from 'vue'

import { isArray } from 'lodash-es'

import { useState } from '@idux/cdk/utils'
import { IxButton } from '@idux/components/button'
import {
  type DatePanelProps,
  type DateRangePanelProps,
  IxDatePanel,
  IxDateRangePanel,
  type RangeShortcutOptions,
  extractShortcutValue,
  getDatePickerThemeTokens,
  ɵRangeShortcuts,
  ɵUseRangeShortcuts,
} from '@idux/components/date-picker'
import { useThemeToken } from '@idux/components/theme'

import PanelFooter from './PanelFooter'
import { proSearchContext } from '../token'
import { proSearchDatePanelProps } from '../types'

export default defineComponent({
  props: proSearchDatePanelProps,
  setup(props, { slots }) {
    const { hashId, registerToken } = useThemeToken('datePicker')
    registerToken(getDatePickerThemeTokens)

    const { locale, mergedPrefixCls } = inject(proSearchContext)!
    const [visiblePanel, setVisiblePanel] = useState<DatePanelProps['visible']>('datePanel')

    const handleChange = (value: Date | Date[] | undefined) => {
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

    const panelProps = computed(() => {
      return {
        cellToolTip: props.cellTooltip,
        disabledDate: props.disabledDate,
        value: props.value,
        defaultOpenValue: props.defaultOpenValue,
        type: props.type,
        timePanelOptions: props.timePanelOptions,
        visible: visiblePanel.value,
        onChange: handleChange,
      }
    })

    const renderSwitchPanelBtn = () => (
      <IxButton mode="text" size="xs" onClick={handleSwitchPanelClick}>
        {visiblePanel.value === 'datePanel' ? locale.switchToTimePanel : locale.switchToDatePanel}
      </IxButton>
    )

    const renderFooter = () => {
      if (props.type !== 'datetime' && !props.showFooter) {
        return
      }

      const panelFooterSlots = {
        prepend: () => (props.type === 'datetime' ? renderSwitchPanelBtn() : null),
        default: props.type === 'datetime' && !props.showFooter ? renderSwitchPanelBtn : null,
      }

      return (
        <div class={`${mergedPrefixCls.value}-date-picker-panel-footer`}>
          <PanelFooter
            prefixCls={mergedPrefixCls.value}
            locale={locale}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            v-slots={panelFooterSlots}
          />
        </div>
      )
    }

    const _renderDateRangePanel = () => {
      return <IxDateRangePanel {...(panelProps.value as DateRangePanelProps)} />
    }

    const { shortcuts, selectedShortcut, showShortcutPanel, setSelectedShortcut } = ɵUseRangeShortcuts(
      computed(() => (props.panelType === 'dateRangePicker' ? props.shortcuts : undefined)),
      computed(() => (isArray(props.value) ? props.value : undefined)),
      computed(() => props.visible && props.active),
      _renderDateRangePanel,
    )

    let currentShortcut: RangeShortcutOptions | undefined = selectedShortcut.value

    const updateSelectedShortcut = (shortcut: RangeShortcutOptions) => {
      setSelectedShortcut(shortcut)
      currentShortcut = shortcut
      props.onSelectedShortcutChange?.(shortcut)
    }

    watch(
      selectedShortcut,
      shortcut => {
        if (shortcut !== currentShortcut) {
          currentShortcut = shortcut
          props.onSelectedShortcutChange?.(shortcut)
        }
      },
      {
        flush: 'pre',
      },
    )

    const handleShortcutChange = (shortcut: RangeShortcutOptions) => {
      updateSelectedShortcut(shortcut)
      if (!shortcut.value) {
        return
      }

      if (shortcut.confirmOnSelect) {
        handleChange(extractShortcutValue(shortcut))
        handleConfirm()
      } else {
        handleChange(extractShortcutValue(shortcut))
      }
    }

    const renderDatePanel = () => {
      return (
        <div class={`${mergedPrefixCls.value}-date-picker-panel-body`}>
          <IxDatePanel {...(panelProps.value as DatePanelProps)} />
        </div>
      )
    }

    const renderDateRangePanel = () => {
      const prefixCls = `${mergedPrefixCls.value}-date-picker-panel`

      if (!shortcuts.value.length) {
        return <div class={`${prefixCls}-body`}>{_renderDateRangePanel()}</div>
      }

      const shortcutPanelRenderContext = {
        slots,
        setBuffer: handleChange,
        setValue: handleChange,
        ok: handleConfirm,
        cancel: handleCancel,
      }

      return (
        <div class={`${prefixCls}-with-shortcuts`}>
          <ɵRangeShortcuts
            class={{
              [`${prefixCls}-shortcuts-with-panel`]: showShortcutPanel.value || !!selectedShortcut.value?.panelRenderer,
            }}
            prefixCls={prefixCls}
            shortcuts={shortcuts.value}
            selectedShortcut={selectedShortcut.value?.key}
            onChange={handleShortcutChange}
          />
          {(selectedShortcut.value?.panelRenderer || showShortcutPanel.value) && (
            <div class={`${prefixCls}-shortcuts-panel`}>
              {selectedShortcut.value?.panelRenderer?.(shortcutPanelRenderContext) ?? _renderDateRangePanel()}
              {renderFooter()}
            </div>
          )}
        </div>
      )
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-date-picker-panel`

      return (
        <div class={[prefixCls, hashId.value]} tabindex={-1} onMousedown={evt => evt.preventDefault()}>
          {props.panelType === 'datePicker' ? renderDatePanel() : renderDateRangePanel()}
          {(props.panelType !== 'dateRangePicker' || !shortcuts.value.length) && renderFooter()}
        </div>
      )
    }
  },
})
