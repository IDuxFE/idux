/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject, ref } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import { dateRangePickerToken } from '../token'

export default defineComponent({
  inheritAttrs: false,
  setup(_, { expose }) {
    const context = inject(dateRangePickerToken)!
    const {
      accessor,
      props,
      locale,
      rangeControlContext: { fromControl, toControl },
      mergedPrefixCls,
      formatRef,
      inputRef,
      inputEnableStatus,
      renderSeparator,
    } = context

    const triggerInputRef = ref<HTMLInputElement>()

    const placeholders = computed(() => [
      props.placeholder?.[0] ?? locale.dateRangePicker[`${props.type}Placeholder`][0],
      props.placeholder?.[1] ?? locale.dateRangePicker[`${props.type}Placeholder`][1],
    ])
    const inputSize = computed(() => Math.max(10, formatRef.value.length) + 2)

    const handleFromInput = (evt: Event) => {
      fromControl.handleInput(evt)
      callEmit(props.onInput, true, evt)
    }
    const handleToInput = (evt: Event) => {
      toControl.handleInput(evt)
      callEmit(props.onInput, false, evt)
    }

    const focus = () => {
      ;(inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef).value?.focus()
    }
    expose({ focus })

    const renderSide = (isFrom: boolean) => {
      const prefixCls = mergedPrefixCls.value
      const { inputValue } = isFrom ? fromControl : toControl
      const placeholder = placeholders.value[isFrom ? 0 : 1]
      const handleInput = isFrom ? handleFromInput : handleToInput

      return (
        <input
          ref={isFrom ? (inputEnableStatus.value.allowInput === 'overlay' ? triggerInputRef : inputRef) : undefined}
          class={`${prefixCls}-input-inner`}
          autocomplete="off"
          disabled={accessor.disabled}
          placeholder={placeholder}
          readonly={props.readonly || inputEnableStatus.value.enableInput === false}
          size={inputSize.value}
          value={inputValue.value}
          onInput={handleInput}
        />
      )
    }

    return () => (
      <div class={`${mergedPrefixCls.value}-input`}>
        {renderSide(true)}
        <span class={`${mergedPrefixCls.value}-input-separator`}>{renderSeparator()}</span>
        {renderSide(false)}
      </div>
    )
  },
})
