/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { selectorToken } from '../token'

export default defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      mergedSearchable,
      mergedFocused,
      mirrorRef,
      inputRef,
      inputValue,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleEnterDown,
    } = inject(selectorToken)!

    const innerInputValue = computed(() => (props.allowInput || mergedSearchable.value ? inputValue.value : ''))
    const inputReadonly = computed(
      () => props.readonly || !mergedFocused.value || !(props.allowInput || mergedSearchable.value),
    )
    const innerStyle = computed(() => {
      return { opacity: inputReadonly.value && !innerInputValue.value ? 0 : undefined }
    })

    return () => {
      const { autocomplete, autofocus, disabled, multiple } = props
      const prefixCls = `${mergedPrefixCls.value}-input`
      return (
        <div class={prefixCls}>
          <input
            ref={inputRef}
            class={`${prefixCls}-inner`}
            style={innerStyle.value}
            autocomplete={autocomplete}
            autofocus={autofocus}
            disabled={disabled}
            readonly={inputReadonly.value}
            value={innerInputValue.value}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
            onKeydown={handleEnterDown}
            onInput={handleInput}
          />
          {multiple && <span ref={mirrorRef} class={`${prefixCls}-mirror`} aria-hidden></span>}
        </div>
      )
    }
  },
})
