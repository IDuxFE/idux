/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TextareaAutoRows } from '../types'

import { type ComputedRef, type Ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

import { isBoolean, isNumber, isObject, throttle } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { rAF } from '@idux/cdk/utils'

import { type BoxSizingData, getBoxSizingData } from '../utils/getBoxSizingData'
import { measureTextarea } from '../utils/measureTextarea'
import { useLineHeight } from './useLineHeight'

export interface AutoRowsContext {
  resizeToFitContent: (force?: boolean) => void
  lineHeight: ComputedRef<number>
  boxSizingData: ComputedRef<BoxSizingData>
}

const isAutoRowsObject = (value: unknown): value is TextareaAutoRows => {
  return (
    isObject(value) && (isNumber((value as TextareaAutoRows).minRows) || isNumber((value as TextareaAutoRows).maxRows))
  )
}

/**
 * resize the height of `<textarea>` to fit it's content value
 *
 * @param textareaRef reference of a textarea element
 * @param autoRows autoRows options
 * @return AutoRowsContext
 */
export function useAutoRows(
  textareaRef: Ref<HTMLTextAreaElement | undefined>,
  autoRows: Ref<boolean | TextareaAutoRows>,
): AutoRowsContext {
  /** Keep track of the previous textarea value to avoid resizing when the value hasn't changed. */
  let previousValue: string | undefined
  let previousMinRows: number | undefined
  let initialHeight: string | undefined
  let isFunctioning = false
  let currentOverflow: string | undefined
  let cachedPlaceholderHeight: number | undefined

  const enabled = computed(() => isAutoRowsObject(autoRows.value) || (isBoolean(autoRows.value) && !!autoRows.value))
  const minRows = computed(() => (isAutoRowsObject(autoRows.value) ? autoRows.value.minRows : undefined))
  const maxRows = computed(() => (isAutoRowsObject(autoRows.value) ? autoRows.value.maxRows : undefined))
  const cachedLineHeight = useLineHeight(textareaRef)
  const boxSizingData = computed(() => {
    if (!textareaRef.value) {
      return { paddingSize: 0, borderSize: 0, boxSizing: '' } as BoxSizingData
    }

    return getBoxSizingData(textareaRef.value)
  })

  function getTextareaScrollHeight() {
    return measureTextarea(textareaRef.value!, textarea => {
      textarea.value = textareaRef.value!.value
      return getHeightByScrollHeight(textarea.scrollHeight, boxSizingData.value)
    })
  }

  function getTextareaPlaceholderHeight() {
    if (!textareaRef.value) {
      return 0
    }

    const textarea = textareaRef.value
    if (!textarea.placeholder) {
      return 0
    }

    if (!cachedPlaceholderHeight) {
      measureTextarea(textareaRef.value!, textarea => {
        textarea.style.height = ''
        textarea.value = textarea.placeholder
        cachedPlaceholderHeight = getHeightByScrollHeight(textarea.scrollHeight, boxSizingData.value)
      })
    }

    return cachedPlaceholderHeight
  }

  /**
   * Resize the textarea to fit its content.
   *
   * @param force Whether to force a height recalculation.
   * By default the height will be recalculated only if the value changed since the last call.
   */
  function resizeToFitContent(force = false) {
    // If autosizing is disabled, just skip everything else
    if (!enabled.value) {
      return
    }

    // If we haven't determined the line-height yet,
    // we know we're still hidden and there's no point in checking the height of the textarea.
    if (!cachedLineHeight.value) {
      return
    }

    const textarea = textareaRef.value!
    const value = textarea.value

    // Only resize if the value or minRows have changed since these calculations can be expensive.
    if (!force && minRows.value === previousMinRows && value === previousValue) {
      return
    }

    textarea.style.lineHeight = `${cachedLineHeight.value}px`

    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    const height = Math.max(getTextareaScrollHeight(), getTextareaPlaceholderHeight()!)

    textarea.style.height = `${height}px`

    currentOverflow = currentOverflow ?? textarea.style.overflow
    textarea.style.overflow = 'hidden'

    nextTick(() =>
      rAF(() => {
        scrollToCaretPosition(textarea)
        textarea.style.overflow = currentOverflow ?? ''
        currentOverflow = undefined
      }),
    )

    previousValue = value
    previousMinRows = minRows.value
  }

  /** Sets the minimum height of the textarea as determined by minRows. */
  function setMinHeight(): void {
    if (!textareaRef.value) {
      return
    }

    const contentHeight = minRows.value && cachedLineHeight.value ? minRows.value * cachedLineHeight.value : null
    const minHeight = contentHeight ? `${getHeightByContentHeight(contentHeight, boxSizingData.value)}px` : ''

    textareaRef.value.style.maxHeight = minHeight
  }

  /** Sets the maximum height of the textarea as determined by maxRows. */
  function setMaxHeight(): void {
    if (!textareaRef.value) {
      return
    }

    const contentHeight = maxRows.value && cachedLineHeight.value ? maxRows.value * cachedLineHeight.value : null
    const maxHeight = contentHeight ? `${getHeightByContentHeight(contentHeight, boxSizingData.value)}px` : ''

    textareaRef.value.style.maxHeight = maxHeight
  }

  /**
   * Scrolls a textarea to the caret position. On Firefox resizing the textarea will
   * prevent it from scrolling to the caret position. We need to re-set the selection
   * in order for it to scroll to the proper position.
   */
  function scrollToCaretPosition(textarea: HTMLTextAreaElement) {
    const { selectionStart, selectionEnd } = textarea

    // IE will throw an "Unspecified error" if we try to set the selection range after the
    // element has been removed from the DOM. Assert that the directive hasn't been destroyed
    // between the time we requested the animation frame and when it was executed.
    // Also note that we have to assert that the textarea is focused before we set the
    // selection range. Setting the selection range on a non-focused textarea will cause
    // it to receive focus on IE and Edge.
    if (isFunctioning && document.activeElement === textarea) {
      textarea.setSelectionRange(selectionStart, selectionEnd)
    }
  }

  function reset() {
    if (initialHeight !== undefined) {
      textareaRef.value && (textareaRef.value.style.height = initialHeight)
    }
  }

  let stopWatch: () => void | undefined
  const onResize = throttle(() => {
    // placeholder height may change after resize, so reset it
    cachedPlaceholderHeight = undefined
    resizeToFitContent(true)
  }, 16)

  onMounted(() => {
    const watchStopHandlers = [
      watch(
        textareaRef,
        () => {
          textareaRef.value && (initialHeight = textareaRef.value.style.height)
        },
        { immediate: true },
      ),
      watch(
        autoRows,
        () => {
          enabled.value ? resizeToFitContent(true) : reset()
        },
        { immediate: true },
      ),
      watch(
        minRows,
        () => {
          setMinHeight()
        },
        { immediate: true },
      ),
      watch(
        maxRows,
        () => {
          setMaxHeight()
        },
        { immediate: true },
      ),
    ]
    const stopResizeObserver = useResizeObserver(textareaRef, onResize)
    stopWatch = () => {
      watchStopHandlers.forEach(stop => stop())
      stopResizeObserver()
    }

    isFunctioning = true
  })
  onUnmounted(() => {
    stopWatch?.()
    isFunctioning = false
  })

  return {
    resizeToFitContent,
    lineHeight: cachedLineHeight,
    boxSizingData,
  }
}

function getHeightByScrollHeight(scrollHeight: number, sizingData: BoxSizingData) {
  const { borderSize, paddingSize, boxSizing } = sizingData

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    return scrollHeight + borderSize
  }

  // remove padding, since height = content
  return scrollHeight - paddingSize
}

function getHeightByContentHeight(contentHeight: number, sizingData: BoxSizingData) {
  const { borderSize, paddingSize, boxSizing } = sizingData

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    return contentHeight + borderSize + paddingSize
  }

  return contentHeight + paddingSize
}
