/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, computed, defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'
import { ɵTrigger } from '@idux/components/_private/trigger'

import { useTriggerProps } from '../composables/useTriggerProps'
import { timeRangePickerContext } from '../tokens'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { attrs, expose }) {
    const context = inject(timeRangePickerContext)!
    const {
      accessor,
      props,
      slots,
      locale,
      mergedPrefixCls,
      inputRef,
      inputEnableStatus,
      renderSeparator,
      rangeControlContext: { fromControl, toControl },
    } = context

    const triggerInputRef = ref<HTMLInputElement>()

    const placeholders: ComputedRef<[string, string]> = computed(() => [
      props.placeholder?.[0] ?? locale.timeRangePicker.placeholder[0],
      props.placeholder?.[1] ?? locale.timeRangePicker.placeholder[1],
    ])

    const focus = () => {
      ;(inputEnableStatus.value.enableExternalInput ? inputRef : triggerInputRef).value?.focus()
    }
    expose({ focus })

    const handleFromInput = (evt: Event) => {
      fromControl.handleInput(evt)
      callEmit(props.onInput, true, evt)
    }
    const handleToInput = (evt: Event) => {
      toControl.handleInput(evt)
      callEmit(props.onInput, false, evt)
    }

    function renderSide(prefixCls: string, isFrom: boolean) {
      const { inputValue } = isFrom ? fromControl : toControl
      const placeholder = placeholders.value[isFrom ? 0 : 1]
      const handleInput = isFrom ? handleFromInput : handleToInput

      return (
        <input
          ref={isFrom ? (inputEnableStatus.value.enableExternalInput ? inputRef : triggerInputRef) : undefined}
          class={`${prefixCls}-input-inner`}
          autocomplete="off"
          disabled={accessor.disabled}
          value={inputValue.value}
          placeholder={placeholder}
          readonly={props.readonly || !inputEnableStatus.value.enableExternalInput}
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
