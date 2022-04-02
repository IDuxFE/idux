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
      mirrorRef,
      inputRef,
      inputValue,
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
    } = inject(selectorToken)!

    const innerStyle = computed(() => {
      return { opacity: props.allowInput || mergedSearchable.value ? undefined : 0 }
    })

    return () => {
      const { autocomplete, autofocus, disabled, multiple, readonly } = props
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
