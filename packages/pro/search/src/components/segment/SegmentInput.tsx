/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CSSProperties,
  type ComputedRef,
  type Ref,
  computed,
  defineComponent,
  inject,
  normalizeClass,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'

import { debounce } from 'lodash-es'

import { useResizeObserver } from '@idux/cdk/resize'
import { getScroll, setScroll } from '@idux/cdk/scroll'
import { callEmit, convertCssPixel, useEventListener, useState } from '@idux/cdk/utils'

import { proSearchContext } from '../../token'
import { type SegmentInputProps, segmentIputProps } from '../../types'
import { measureTextWidth } from '../../utils'

export default defineComponent({
  inheritAttrs: false,
  props: segmentIputProps,
  setup(props: SegmentInputProps, { attrs, expose }) {
    const { mergedPrefixCls } = inject(proSearchContext)!

    const segmentWrapperRef = ref<HTMLElement>()
    const segmentInputRef = ref<HTMLInputElement>()

    const { input, handleInput, handleCompositionStart, handleCompositionEnd } = useInputEvents(props)
    const segmentScroll = useSegmentScroll(props, segmentInputRef, segmentWrapperRef)

    const displayedText = computed(() => input.value || props.placeholder || '')
    const [textWidth, setTextWidth] = useState<number>(0)

    const leftSideEllipsis = computed(() => segmentScroll.value.left > 1)
    const rightSideEllipsis = computed(() => segmentScroll.value.right > 1)

    const inputStyle = computed(() => ({
      minWidth: props.disabled ? '0' : undefined,
      width: convertCssPixel(textWidth.value),
    }))

    watch(textWidth, width => {
      callEmit(props.onWidthChange, width)
    })

    const classes = computed(() => {
      const prefixCls = `${mergedPrefixCls.value}-segment-input`

      return normalizeClass({
        [prefixCls]: true,
        [`${prefixCls}-disabled`]: !!props.disabled,
      })
    })

    onMounted(() => {
      watch(
        displayedText,
        text => {
          setTextWidth(measureTextWidth(text, segmentWrapperRef.value))
        },
        { immediate: true },
      )
      watch(
        inputStyle,
        style => {
          segmentInputRef.value &&
            Object.entries(style).forEach(([key, value]) => {
              segmentInputRef.value!.style[key as keyof typeof style] = value ?? ''
            })
        },
        { immediate: true },
      )
    })

    const getInputElement = () => segmentInputRef.value
    expose({
      getInputElement,
    })

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-segment-input`
      const { class: className, style, ...rest } = attrs

      return (
        <span ref={segmentWrapperRef} class={normalizeClass([classes.value, className])}>
          <span
            v-show={props.ellipsis && leftSideEllipsis.value}
            class={`${prefixCls}-ellipsis-left`}
            key="__ellisps_left__"
          >
            ...
          </span>
          <input
            ref={segmentInputRef}
            class={`${prefixCls}-inner`}
            style={style as CSSProperties}
            value={input.value ?? ''}
            disabled={props.disabled}
            placeholder={props.placeholder}
            onInput={handleInput}
            onCompositionstart={handleCompositionStart}
            onCompositionend={handleCompositionEnd}
            {...rest}
          ></input>
          <span
            v-show={props.ellipsis && rightSideEllipsis.value}
            class={`${prefixCls}-ellipsis-right`}
            key="__ellisps_right__"
          >
            ...
          </span>
        </span>
      )
    }
  },
})

interface InputEventHandlerContext {
  input: ComputedRef<string | undefined>
  handleInput: (evt: Event) => void
  handleCompositionStart: () => void
  handleCompositionEnd: (evt: CompositionEvent) => void
}

function useInputEvents(props: SegmentInputProps): InputEventHandlerContext {
  let isComposing = false
  const [input, setInput] = useState<string | undefined>(props.value)

  watch(
    () => props.value,
    value => {
      setInput(value)
    },
  )

  const handleInput = (evt: Event) => {
    const inputValue = (evt.target as HTMLInputElement).value
    setInput(inputValue)

    if (!isComposing) {
      callEmit(props.onInput, inputValue)
    }
  }
  const handleCompositionStart = () => {
    isComposing = true
  }
  const handleCompositionEnd = (evt: CompositionEvent) => {
    if (isComposing) {
      isComposing = false
      handleInput(evt)
    }
  }

  return {
    input,
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
  }
}

interface SegmentScroll {
  left: number
  right: number
}

function useSegmentScroll(
  props: SegmentInputProps,
  inputRef: Ref<HTMLInputElement | undefined>,
  wrapperRef: Ref<HTMLElement | undefined>,
): ComputedRef<SegmentScroll> {
  const [segmentScroll, setSegmentScroll] = useState<SegmentScroll>({ left: 0, right: 0 }, true)

  let listenerStops: (() => void)[]
  const stopListen = () => {
    listenerStops.forEach(stop => stop())
  }

  const getScrolls = (): SegmentScroll => {
    const el = inputRef.value
    if (!el) {
      return { left: 0, right: 0 }
    }

    const { scrollLeft } = getScroll(el)
    return {
      left: scrollLeft,
      right: Math.max(el.scrollWidth - scrollLeft - el.offsetWidth, 0),
    }
  }

  const updateScroll = debounce(() => {
    setSegmentScroll(getScrolls())
  }, 10)

  const scrollIntoView = () => {
    if (!inputRef.value) {
      return
    }

    const width = inputRef.value.offsetWidth ?? 0
    const selectionStart = inputRef.value.selectionStart

    if (!width || selectionStart === null) {
      return
    }

    const textBefore = (inputRef.value.value ?? '').slice(0, selectionStart)
    const textBeforeWidth = measureTextWidth(textBefore, wrapperRef.value)
    const { scrollLeft } = getScroll(inputRef.value)

    if (textBeforeWidth < scrollLeft - 1) {
      setScroll({ scrollLeft: Math.max(textBeforeWidth - 2, 0) }, inputRef.value)
    } else if (textBeforeWidth > scrollLeft + width + 1) {
      setScroll({ scrollLeft: textBeforeWidth - width + 2 }, inputRef.value)
    }
  }

  onMounted(() => {
    if (props.ellipsis) {
      listenerStops = [
        useEventListener(inputRef, 'scroll', updateScroll),
        useResizeObserver(inputRef, () => {
          if (document.activeElement === inputRef.value) {
            scrollIntoView()
          }
          updateScroll()
        }),
        useEventListener(inputRef, 'input', updateScroll),
        useEventListener(inputRef, 'compositionend', scrollIntoView),
      ]
    }
  })

  onUnmounted(() => {
    stopListen()
  })

  return segmentScroll
}
