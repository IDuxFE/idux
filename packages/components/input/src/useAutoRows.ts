// https://github.com/angular/components/blob/master/src/cdk/text-field/autosize.ts

import type { ComputedRef, Ref } from 'vue'
import type { ValueAccessor } from '@idux/cdk/forms'
import type { TextareaAutoRows } from './types'

import { nextTick, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import throttle from 'lodash/throttle'
import { isFirefox } from '@idux/cdk/platform'
import { isObject, isNumber, on, off, rAF } from '@idux/cdk/utils'

const isAutoRowsObject = (value: unknown): value is TextareaAutoRows => {
  return isObject(value) && isNumber(value.minRows) && isNumber(value.maxRows)
}

export function useAutoRows(
  textareaRef: Ref<HTMLTextAreaElement>,
  autoRows: ComputedRef<boolean | TextareaAutoRows>,
  valueAccessor: ValueAccessor,
): void {
  let enabled = false
  let minRows: number | null = null
  let maxRows: number | null = null

  /** Keep track of the previous textarea value to avoid resizing when the value hasn't changed. */
  let previousValue: string | undefined
  let previousMinRows: number | null = null
  let initialHeight: string | undefined

  /** Cached height of a textarea with a single row. */
  let cachedLineHeight: number | undefined
  // padding + border
  const textareaBoxHeight = 10

  /** Class that should be applied to the textarea while it's being measured. */
  const measuringClass = isFirefox ? 'ix-textarea-autosize-measuring-firefox' : 'ix-textarea-autosize-measuring'

  let isDestroyed = false

  /**
   * Resize the textarea to fit its content.
   * @param force Whether to force a height recalculation.
   * By default the height will be recalculated only if the value changed since the last call.
   */
  function resizeToFitContent(force = false) {
    // If autosizing is disabled, just skip everything else
    if (!enabled) {
      return
    }

    cacheTextareaLineHeight()

    // If we haven't determined the line-height yet,
    // we know we're still hidden and there's no point in checking the height of the textarea.
    if (!cachedLineHeight) {
      return
    }

    const textarea = textareaRef.value
    const value = textarea.value

    // Only resize if the value or minRows have changed since these calculations can be expensive.
    if (!force && minRows === previousMinRows && value === previousValue) {
      return
    }

    const placeholderText = textarea.placeholder

    // Reset the textarea height to auto in order to shrink back to its default size.
    // Also temporarily force overflow:hidden, so scroll bars do not interfere with calculations.
    // Long placeholders that are wider than the textarea width may lead to a bigger scrollHeight
    // value. To ensure that the scrollHeight is not bigger than the content, the placeholders
    // need to be removed temporarily.
    textarea.classList.add(measuringClass)
    textarea.placeholder = ''

    const height =
      Math.round((textarea.scrollHeight - textareaBoxHeight) / cachedLineHeight) * cachedLineHeight + textareaBoxHeight

    // Use the scrollHeight to know how large the textarea *would* be if fit its entire value.
    textarea.style.height = `${height}px`
    textarea.classList.remove(measuringClass)
    textarea.placeholder = placeholderText

    nextTick(() => rAF(() => scrollToCaretPosition(textarea)))

    previousValue = value
    previousMinRows = minRows
  }

  /**
   * Cache the height of a single-row textarea if it has not already been cached.
   *
   * We need to know how large a single "row" of a textarea is in order to apply minRows and
   * maxRows. For the initial version, we will assume that the height of a single line in the
   * textarea does not ever change.
   */
  function cacheTextareaLineHeight(): void {
    if (cachedLineHeight) {
      return
    }

    // Use a clone element because we have to override some styles.
    const textarea = textareaRef.value
    const textareaClone = textarea.cloneNode(false) as HTMLTextAreaElement
    textareaClone.rows = 1

    // Use `position: absolute` so that this doesn't cause a browser layout and use
    // `visibility: hidden` so that nothing is rendered. Clear any other styles that
    // would affect the height.
    textareaClone.style.position = 'absolute'
    textareaClone.style.visibility = 'hidden'
    textareaClone.style.border = 'none'
    textareaClone.style.padding = '0'
    textareaClone.style.height = ''
    textareaClone.style.minHeight = ''
    textareaClone.style.maxHeight = ''

    // In Firefox it happens that textarea elements are always bigger than the specified amount
    // of rows. This is because Firefox tries to add extra space for the horizontal scrollbar.
    // As a workaround that removes the extra space for the scrollbar, we can just set overflow
    // to hidden. This ensures that there is no invalid calculation of the line height.
    // See Firefox bug report: https://bugzilla.mozilla.org/show_bug.cgi?id=33654
    textareaClone.style.overflow = 'hidden'

    textarea.parentNode!.appendChild(textareaClone)
    cachedLineHeight = textareaClone.clientHeight
    textarea.parentNode!.removeChild(textareaClone)

    // Min and max heights have to be re-calculated if the cached line height changes
    setMinHeight()
    setMaxHeight()
  }

  /** Sets the minimum height of the textarea as determined by minRows. */
  function setMinHeight(): void {
    const minHeight = minRows && cachedLineHeight ? `${minRows * cachedLineHeight + textareaBoxHeight}px` : null

    if (minHeight) {
      textareaRef.value.style.minHeight = minHeight
    }
  }

  /** Sets the maximum height of the textarea as determined by maxRows. */
  function setMaxHeight(): void {
    const maxHeight = maxRows && cachedLineHeight ? `${maxRows * cachedLineHeight + textareaBoxHeight}px` : null

    if (maxHeight) {
      textareaRef.value.style.maxHeight = maxHeight
    }
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
    if (!isDestroyed && document.activeElement === textarea) {
      textarea.setSelectionRange(selectionStart, selectionEnd)
    }
  }

  function reset() {
    // Do not try to change the textarea, if the initialHeight has not been determined yet
    // This might potentially remove styles when reset() is called before ngAfterViewInit
    if (initialHeight !== undefined) {
      textareaRef.value.style.height = initialHeight
    }
  }

  const onResize = throttle(() => resizeToFitContent(true), 16)

  onMounted(() => {
    // Remember the height which we started with in case autosizing is disabled
    initialHeight = textareaRef.value.style.height

    watchEffect(() => {
      const _autoRows = autoRows.value
      if (isAutoRowsObject(_autoRows)) {
        enabled = true
        minRows = _autoRows.minRows
        maxRows = _autoRows.maxRows
      } else {
        enabled = _autoRows
        minRows = null
        maxRows = null
      }
      enabled ? resizeToFitContent(true) : reset()
    })

    watch(
      () => valueAccessor.value,
      () => resizeToFitContent(),
    )

    on(window, 'resize', onResize)
  })

  onUnmounted(() => {
    off(window, 'resize', onResize)
    isDestroyed = true
  })
}
