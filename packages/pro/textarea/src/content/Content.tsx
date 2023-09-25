/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextareaError } from '../types'

import { type CSSProperties, defineComponent, inject } from 'vue'

import { callEmit } from '@idux/cdk/utils'

import ErrorLine from './ErrorLine'
import { proTextareaContext } from '../token'

export default defineComponent({
  setup() {
    const {
      props,
      mergedPrefixCls,
      accessor,
      boxSizingData,
      rowCounts,
      lineHeight,
      textareaRef,
      visibleErrIndex,

      handleInput,
      handleCompositionStart,
      handleCompositionEnd,
      handleTextareaMouseMove,
      handleTextareaMouseLeave,
    } = inject(proTextareaContext)!

    const renderErrorLines = () =>
      props.errors
        ?.map(
          error =>
            rowCounts.value.length > error.index && (
              <ErrorLine
                style={getErrorLineStyle(error, rowCounts.value, lineHeight.value, boxSizingData.value?.paddingTop)}
                message={error.message}
                visible={error.index === visibleErrIndex.value}
              />
            ),
        )
        .filter(Boolean)

    const onKeyDown = (evt: KeyboardEvent) => {
      callEmit(props.onKeyDown, evt)
    }

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-content`

      return (
        <div class={prefixCls} onMousemove={handleTextareaMouseMove} onMouseleave={handleTextareaMouseLeave}>
          {renderErrorLines()}
          <textarea
            ref={textareaRef}
            class={`${prefixCls}-textarea`}
            disabled={accessor.disabled}
            readonly={props.readonly}
            placeholder={props.placeholder}
            onInput={handleInput}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
            onKeydown={onKeyDown}
          ></textarea>
        </div>
      )
    }
  },
})

function getErrorLineStyle(
  error: TextareaError,
  rowCounts: number[],
  lineHeight: number,
  paddingTop?: number,
): CSSProperties {
  let top = 0
  for (let i = 0; i < error.index; i++) {
    top += rowCounts[i] * lineHeight
  }

  top += paddingTop ?? 0

  return {
    top: `${top}px`,
    height: `${lineHeight * rowCounts[error.index]}px`,
  }
}
