/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { selectToken } from '../token'

export default defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      isDisabled,
      inputRef,
      inputValue,

      mirrorRef,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
    } = inject(selectToken)!

    const innerStyle = computed(() => {
      const { allowInput, searchable } = props
      const isOpacity = allowInput || searchable === true
      return { opacity: isOpacity ? undefined : 0 }
    })

    return () => {
      const { autofocus, multiple, readonly } = props
      const prefixCls = `${mergedPrefixCls.value}-selector-input`
      return (
        <div class={prefixCls}>
          <input
            ref={inputRef}
            class={`${prefixCls}-inner`}
            style={innerStyle.value}
            autocomplete="off"
            autofocus={autofocus}
            disabled={isDisabled.value}
            readonly={readonly}
            value={inputValue.value}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
            onInput={handleInput}
          />
          {multiple && <span ref={mirrorRef} class={`${prefixCls}-mirror`} aria-hidden></span>}
        </div>
      )
    }
  },
})
