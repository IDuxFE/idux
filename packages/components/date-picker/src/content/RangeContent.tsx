/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { RangeShortcutOptions } from '../types'

import { type VNodeChild, computed, defineComponent, inject } from 'vue'

import RangePickerOverlayFooter from './RangePickerOverlayFooter'
import RangePickerOverlayInputs from './RangePickerOverlayInputs'
import RangePanel from '../panel/RangePanel'
import { dateRangePickerToken } from '../token'
import RangeShortcuts from './RangeShortcuts'
import { extractShortcutValue } from '../utils'

export default defineComponent({
  setup(_, { slots }) {
    const context = inject(dateRangePickerToken)!
    const {
      props,
      mergedPrefixCls,
      shortcuts,
      selectedShortcut,
      showShortcutPanel,
      setSelectedShortcut,
      rangeControlContext: { buffer, bufferUpdated, handlePanelChange },
      handleChange,
      setOverlayOpened,
    } = context

    const handleShortcutChange = (shortcut: RangeShortcutOptions) => {
      setSelectedShortcut(shortcut)
      if (!shortcut.value) {
        return
      }

      if (shortcut.confirmOnSelect) {
        handleChange(extractShortcutValue(shortcut))
        setOverlayOpened(false)
      } else {
        handlePanelChange(extractShortcutValue(shortcut))
      }
    }

    const shortcutOk = () => {
      if (bufferUpdated.value) {
        handleChange(buffer.value)
      }

      setOverlayOpened(false)
    }

    const shorcutCancel = () => {
      setOverlayOpened(false)
    }

    return () => {
      if (slots.overlay) {
        return slots.overlay()
      }

      let children: VNodeChild

      const contentClasses = computed(() => {
        const prefixCls = `${mergedPrefixCls.value}-overlay-content`

        return {
          [prefixCls]: true,
          [`${prefixCls}-with-shortcuts`]: !!shortcuts.value.length,
        }
      })

      const shortcutPanelRenderContext = {
        slots,
        setBuffer: handlePanelChange,
        setValue: handleChange,
        ok: shortcutOk,
        cancel: shorcutCancel,
      }

      if (shortcuts.value.length) {
        children = [
          <RangeShortcuts
            class={{
              [`${mergedPrefixCls.value}-shortcuts-with-panel`]:
                showShortcutPanel.value || !!selectedShortcut.value?.panelRenderer,
            }}
            prefixCls={mergedPrefixCls.value}
            shortcuts={shortcuts.value}
            selectedShortcut={selectedShortcut.value?.key}
            onChange={handleShortcutChange}
          />,
          selectedShortcut.value?.panelRenderer ? (
            <div class={`${mergedPrefixCls.value}-shortcuts-panel`}>
              {selectedShortcut.value.panelRenderer(shortcutPanelRenderContext)}
            </div>
          ) : showShortcutPanel.value ? (
            <div class={`${mergedPrefixCls.value}-shortcuts-panel`}>
              <RangePickerOverlayInputs v-slots={slots} />
              <RangePanel />
              <RangePickerOverlayFooter v-slots={slots} />
            </div>
          ) : undefined,
        ]
      } else {
        children = [
          <RangePickerOverlayInputs v-slots={slots} />,
          <RangePanel />,
          <RangePickerOverlayFooter v-slots={slots} />,
        ]
      }

      return props.overlayRender ? props.overlayRender(children) : <div class={contentClasses.value}>{children}</div>
    }
  },
})
