/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type CSSProperties, computed, defineComponent, inject, normalizeClass, onMounted, ref, watch } from 'vue'

import { callEmit, convertCssPixel, useState } from '@idux/cdk/utils'

import { proSearchContext } from '../../token'
import { type SegmentInputProps, segmentIputProps } from '../../types'
import MeasureElement from '../MeasureElement'

export default defineComponent({
  inheritAttrs: false,
  props: segmentIputProps,
  setup(props: SegmentInputProps, { attrs, expose }) {
    const { mergedPrefixCls } = inject(proSearchContext)!

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

    return () => {
      const prefixCls = `${mergedPrefixCls.value}-segment-input`
      const { class: className, style, ...rest } = attrs

      return (
        <span class={normalizeClass([classes.value, className])}>
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
