/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { computed, defineComponent, inject } from 'vue'

import { treeSelectToken } from '../token'

export default defineComponent({
  setup() {
    const { props, mergedPrefixCls, isDisabled, inputRef, inputWidth, mirrorRef, searchValue, handleInput } =
      inject(treeSelectToken)!

    const onClick = (evt: Event) => {
      // 多选时input宽度会变小，导致点击trigger时会让input的click事件冒泡，触发两次浮层的展开收缩逻辑
      if (props.multiple) {
        evt.stopPropagation()
      }
    }
    const style = computed(() => ({ width: inputWidth.value }))
    const innerStyle = computed(() => {
      const { searchable } = props
      return { opacity: searchable === true ? undefined : 0 }
    })

    return () => {
      const { autofocus, multiple, readonly } = props
      const prefixCls = `${mergedPrefixCls.value}-selector-input`
      return (
        <div class={prefixCls} style={style.value}>
          <input
            ref={inputRef}
            class={`${prefixCls}-inner`}
            style={innerStyle.value}
            autocomplete="off"
            autofocus={autofocus}
            disabled={isDisabled.value}
            readonly={readonly}
            value={searchValue.value}
            onClick={onClick}
            onInput={handleInput}
          />
          {multiple && <span ref={mirrorRef} class={`${prefixCls}-mirror`} aria-hidden></span>}
        </div>
      )
    }
  },
})
