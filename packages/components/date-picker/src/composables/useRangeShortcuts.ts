/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type {
  PresetRangeShortcut,
  RangeShortcut,
  RangeShortcutOptions,
  RangeShortcutPanelRenderContext,
  RangeShortcutProp,
} from '../types'
import type { DateRangePickerLocale } from '@idux/components/locales'

import { type ComputedRef, type Ref, type VNodeChild, computed, h, watch } from 'vue'

import { isArray, isString } from 'lodash-es'

import { useState } from '@idux/cdk/utils'
import { type DateConfig, useDateConfig, useGlobalConfig } from '@idux/components/config'

import RangePickerOverlayFooter from '../content/RangePickerOverlayFooter'
import RangePickerOverlayInputs from '../content/RangePickerOverlayInputs'
import RangePanel from '../panel/RangePanel'
import { extractShortcutValue, getPresetRangeShortcutValue } from '../utils'

export interface DateRangeShortcutsContext {
  shortcuts: ComputedRef<RangeShortcutOptions[]>
  selectedShortcut: ComputedRef<RangeShortcutOptions | undefined>
  showShortcutPanel: ComputedRef<boolean>
  setSelectedShortcut: (shortcut: RangeShortcutOptions | undefined) => void
}

const rangePickerPanelRenderer = (context: RangeShortcutPanelRenderContext) => {
  return [
    h(RangePickerOverlayInputs, null, context.slots),
    h(RangePanel),
    h(RangePickerOverlayFooter, null, context.slots),
  ]
}

export function useRangeShortcuts(
  shortcutsProp: Ref<RangeShortcutProp | RangeShortcut[] | undefined>,
  valueRef: Ref<(Date | undefined)[] | undefined>,
  visibleRef: Ref<boolean>,
  presetPanelRenderer: (context: RangeShortcutPanelRenderContext) => VNodeChild = rangePickerPanelRenderer,
): DateRangeShortcutsContext {
  const dateConfig = useDateConfig()
  const { dateRangePicker: dateRangePickerLocale } = useGlobalConfig('locale')

  const [selectedShortcut, setSelectedShortcut] = useState<RangeShortcutOptions | undefined>(undefined)

  const showShortcutPanel = computed(() => {
    if (isArray(shortcutsProp.value)) {
      return false
    }

    return !!shortcutsProp.value?.showPanel
  })

  const shortcuts = computed(() => {
    if (!shortcutsProp.value) {
      return []
    }

    let shortcuts: RangeShortcut[] = []
    let showPanel = false

    if (isArray(shortcutsProp.value)) {
      shortcuts = shortcutsProp.value
      showPanel = false
    } else {
      shortcuts = shortcutsProp.value.shortcuts
      showPanel = shortcutsProp.value.showPanel ?? showPanel
    }

    return shortcuts
      .map(shortcut => {
        if (isString(shortcut)) {
          return getResolvedPresetShortcutOption(
            dateConfig,
            shortcut,
            dateRangePickerLocale,
            showPanel,
            presetPanelRenderer,
          )
        }

        const panelRenderer =
          shortcut.panelRenderer ?? (showPanel && shortcut.value ? rangePickerPanelRenderer : undefined)

        return {
          ...shortcut,
          confirmOnSelect: !panelRenderer ? true : shortcut.confirmOnSelect,
          panelRenderer,
        }
      })
      .filter(Boolean) as RangeShortcutOptions[]
  })

  const customShortcut = computed(() => shortcuts.value.find(s => s.key === 'custom'))

  const getSelectedShortcutByValue = () => {
    const value = valueRef.value

    if (!value) {
      return
    }

    return (
      shortcuts.value.find(
        shortcut =>
          shortcut.value &&
          value?.every((v, i) => shortcut && extractShortcutValue(shortcut)?.[i].valueOf() === v?.valueOf()),
      ) ?? customShortcut.value
    )
  }

  watch(
    valueRef,
    () => {
      const selectedShortcutByValue = getSelectedShortcutByValue()

      if (selectedShortcutByValue?.value || selectedShortcut.value) {
        setSelectedShortcut(selectedShortcutByValue)
      }
    },
    {
      flush: 'pre',
      immediate: true,
    },
  )
  watch(
    visibleRef,
    visible => {
      if (visible) {
        return
      }

      const selectedShortcutByValue = getSelectedShortcutByValue()

      if (selectedShortcut.value?.key !== selectedShortcutByValue?.key) {
        setSelectedShortcut(selectedShortcutByValue)
      }
    },
    { flush: 'pre' },
  )

  return {
    shortcuts,
    selectedShortcut,
    showShortcutPanel,
    setSelectedShortcut,
  }
}

function getResolvedPresetShortcutOption(
  dateConfig: DateConfig,
  presetShortcut: PresetRangeShortcut,
  locales: DateRangePickerLocale,
  showPanel: boolean,
  presetPanelRenderer: (context: RangeShortcutPanelRenderContext) => VNodeChild,
): RangeShortcutOptions | undefined {
  if (presetShortcut === 'custom') {
    return {
      key: 'custom',
      label: locales.shortcuts['custom'],
      panelRenderer: presetPanelRenderer,
    }
  }

  const value = getPresetRangeShortcutValue(dateConfig, presetShortcut)

  if (!value) {
    return
  }

  return {
    key: presetShortcut,
    value: value,
    label: locales.shortcuts[presetShortcut],
    confirmOnSelect: !showPanel,
    selectedLabel: locales.shortcuts[presetShortcut],
    panelRenderer: showPanel ? presetPanelRenderer : undefined,
  }
}
