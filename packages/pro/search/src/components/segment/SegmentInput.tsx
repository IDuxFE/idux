/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import {
  type CSSProperties,
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

import { useResizeObserver } from '@idux/cdk/resize'
import { getScroll, setScroll } from '@idux/cdk/scroll'
import { callEmit, convertCssPixel, useEventListener, useState } from '@idux/cdk/utils'

import { proSearchContext } from '../../token'
import { type SegmentInputProps, segmentIputProps } from '../../types'
import MeasureElement from '../MeasureElement'

export default defineComponent({
  inheritAttrs: false,
  props: segmentIputProps,
  setup(props: SegmentInputProps, { attrs, expose }) {
    const { mergedPrefixCls } = inject(proSearchContext)!

    const segmentWrapperRef = ref<HTMLElement>()
    const segmentInputRef = ref<HTMLInputElement>()

    const [inputWidth, setInputWidth] = useState(0)

    const inputStyle = computed(() => ({
      minWidth: props.disabled ? '0' : undefined,
      width: convertCssPixel(inputWidth.value),
    }))

    watch(inputWidth, width => {
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

    const { handleInput, handleCompositionStart, handleCompositionEnd } = useInputEvents(props)
    const segmentScroll = useSegmentScroll(props, segmentInputRef)

    const leftSideEllipsis = computed(() => segmentScroll.value.left > 1)
    const rightSideEllipsis = computed(() => segmentScroll.value.right > 1)

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
            value={props.value ?? ''}
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
          <MeasureElement onWidthChange={setInputWidth}>{props.value || props.placeholder || ''}</MeasureElement>
        </span>
      )
    }
  },
})

interface InputEventHandlers {
  handleInput: (evt: Event) => void
  handleCompositionStart: () => void
  handleCompositionEnd: (evt: CompositionEvent) => void
}

function useInputEvents(props: SegmentInputProps): InputEventHandlers {
  const isComposing = ref(false)

  const handleInput = (evt: Event) => {
    if (!isComposing.value) {
      callEmit(props.onInput, (evt.target as HTMLInputElement).value)
    }
  }
  const handleCompositionStart = () => {
    isComposing.value = true
  }
  const handleCompositionEnd = (evt: CompositionEvent) => {
    if (isComposing.value) {
      isComposing.value = false
      handleInput(evt)
    }
  }

  return {
    handleInput,
    handleCompositionStart,
    handleCompositionEnd,
  }
}

interface SegmentScroll {
  left: number
  right: number
}

function useSegmentScroll(props: SegmentInputProps, inputRef: Ref<HTMLInputElement | undefined>) {
  const [segmentScroll, setSegmentScroll] = useState<SegmentScroll>({ left: 0, right: 0 }, true)
  let inputWidth = 0
  let oldSegmentScroll: SegmentScroll = { left: 0, right: 0 }

  let stopScrollListen: (() => void) | undefined
  let stopResizeListen: (() => void) | undefined

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

  const updateScroll = () => {
    oldSegmentScroll = segmentScroll.value
    setSegmentScroll(getScrolls())
  }

  onMounted(() => {
    inputWidth = inputRef.value?.offsetWidth ?? 0

    if (props.ellipsis) {
      stopScrollListen = useEventListener(inputRef, 'scroll', updateScroll)
      stopResizeListen = useResizeObserver(inputRef, () => {
        const width = inputRef.value?.offsetWidth ?? 0
        const widthOffset = inputWidth - width
        inputWidth = width

        if (widthOffset > 0 && segmentScroll.value.left > 0 && oldSegmentScroll.left <= 0) {
          setScroll({ scrollLeft: segmentScroll.value.left + widthOffset }, inputRef.value)
        } else {
          updateScroll()
        }
      })
    }
  })

  onUnmounted(() => {
    stopScrollListen?.()
    stopResizeListen?.()
  })

  return segmentScroll
}
