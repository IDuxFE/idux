/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject } from 'vue'

import { ɵTrigger } from '@idux/components/_private/trigger'

import { useTriggerProps } from '../composables/useTriggerProps'
import { timeRangePickerContext } from '../tokens'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs }) {
    const context = inject(timeRangePickerContext)!
    const {
      props: pickerProps,
      slots,
      locale,
      mergedPrefixCls,
      inputRef,
      inputEnableStatus,
      renderSeparator,
      rangeControlContext: { fromControl, toControl },
    } = context

    const placeholders: ComputedRef<[string, string]> = computed(() => [
      pickerProps.placeholder?.[0] ?? locale.timeRangePicker.placeholder[0],
      pickerProps.placeholder?.[1] ?? locale.timeRangePicker.placeholder[1],
    ])

    function renderSide(prefixCls: string, isFrom: boolean) {
      const { inputValue, handleInput } = isFrom ? fromControl : toControl
      const { disabled, readonly } = triggerProps.value
      const placeholder = placeholders.value[isFrom ? 0 : 1]

      return (
        <input
          ref={isFrom && inputEnableStatus.value.enableExternalInput ? inputRef : undefined}
          class={`${prefixCls}-input-inner`}
          autocomplete="off"
          disabled={disabled}
          value={inputValue.value}
          placeholder={placeholder}
          readonly={readonly}
          onInput={handleInput}
        />
      )
    }

    const triggerProps = useTriggerProps(context)
    const renderContent = (prefixCls: string) => (
      <span class={`${prefixCls}-input`}>
        {renderSide(prefixCls, true)}
        <span class={`${prefixCls}-input-separator`}>{renderSeparator()}</span>
        {renderSide(prefixCls, false)}
      </span>
    )

    return () => {
      const prefixCls = mergedPrefixCls.value
      const triggerSlots = {
        default: () => renderContent(prefixCls),
        suffix: slots.suffix,
        clearIcon: slots.clearIcon,
      }

      return <ɵTrigger className={prefixCls} v-slots={triggerSlots} {...triggerProps.value} {...attrs} />
    }
  },
})
