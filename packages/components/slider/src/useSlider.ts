/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { SliderContext } from './token'
import type { SliderProps, SliderThumbInstance } from './types'
import type { ComputedRef, Ref } from 'vue'

import { computed, nextTick, ref, toRaw, watch } from 'vue'

import { Logger, callEmit, getMouseClientXY, isNumeric, off, on } from '@idux/cdk/utils'
import { useFormAccessor, useFormElement } from '@idux/components/form'

import { sliderStartDirection } from './token'

export type Nullable<T> = T | null

export interface SliderBindings {
  valuesRef: Ref<number[]>
  thumbListRef: Ref<SliderThumbInstance[]>
  railRef: Ref<Nullable<HTMLElement>>
  direction: SliderContext['direction']
  isDisabled: ComputedRef<boolean>
  isDragging: Ref<boolean>
  focus: (options?: FocusOptions | undefined) => void
  blur: () => void
  setThumbRefs: (index: number) => (el: unknown) => void
  handleMouseDown: (evt: MouseEvent | TouchEvent) => void
  handleMouseUp: () => void
  handleKeyDown: (evt: KeyboardEvent) => void
  handleMarkClick: (evt: MouseEvent | TouchEvent, newValue: number) => void
}

export function useSlider(props: SliderProps): SliderBindings {
  const { elementRef, focus, blur } = useFormElement<HTMLElement>()
  const accessor = useFormAccessor<number | number[]>()

  const valuesRef = ref<number[]>([props.min, props.min])
  const thumbListRef = ref<SliderThumbInstance[]>([])
  const activeIndex = ref<number>(-1)
  const railRef = ref<Nullable<HTMLElement>>(null)
  const isDragging = ref(false)
  const isDisabled = computed(() => accessor?.disabled.value)

  const precision = computed(() => {
    const precisions = [props.min, props.max, props.step].map(num => {
      const decimal = `${num}`.split('.')[1]
      return decimal ? decimal.length : 0
    })
    return Math.max(...precisions)
  })

  const stepPrecision = computed(() => {
    const decimal = `${props.step}`.split('.')[1]
    return decimal ? decimal.length : 0
  })

  const direction = computed(() => {
    if (props.vertical) {
      return props.reverse ? sliderStartDirection.ttb : sliderStartDirection.btt
    }
    return props.reverse ? sliderStartDirection.rtl : sliderStartDirection.ltr
  })

  function setThumbRefs(index: number) {
    return (el: unknown) => {
      if (index === 0) {
        elementRef.value = (el as SliderThumbInstance)?.thumbRef
      }

      thumbListRef.value[index] = el as SliderThumbInstance
    }
  }

  function handleMouseDown(evt: MouseEvent | TouchEvent) {
    const index = thumbListRef.value.findIndex(v => v?.thumbRef === evt.target)
    if (index !== -1) {
      // avoid triggering scrolling on touch
      evt.preventDefault()
      activeIndex.value = index
      thumbListRef.value[index]?.thumbRef?.focus()
      startDragging()
    } else {
      const newValue = calcValueByMouseEvent(evt)
      setActiveIndex(newValue)
      updateModelValue(newValue)
    }
  }

  function handleKeyDown(evt: KeyboardEvent) {
    if (props.keyboard) {
      const index = thumbListRef.value.findIndex(v => v?.thumbRef === evt.target)
      if (index !== -1) {
        let value: Nullable<number> = null
        if (evt.code === 'ArrowUp' || evt.code === 'ArrowRight') {
          activeIndex.value = index
          value = incValueByActiveIndex(+1)
        } else if (evt.code === 'ArrowDown' || evt.code === 'ArrowLeft') {
          activeIndex.value = index
          value = incValueByActiveIndex(-1)
        }

        if (value !== null) {
          evt.preventDefault()
          updateModelValue(value)
          checkAcross(value)
        }
      }
    }
  }

  function handleMarkClick(evt: MouseEvent | TouchEvent, newValue: number) {
    evt.stopPropagation()
    setActiveIndex(newValue)
    updateModelValue(newValue)
  }

  function startDragging() {
    if (!isDragging.value) {
      isDragging.value = true

      on(window, 'mousemove', handleMouseMove)
      on(window, 'touchmove', handleMouseMove)
      on(window, 'mouseup', handleMouseUpOnDocument)
      on(window, 'touchend', handleMouseUpOnDocument)
      on(window, 'contextmenu', handleMouseUpOnDocument)
    }
  }

  function stopDragging() {
    if (isDragging.value) {
      const activeThumbRef = thumbListRef.value[activeIndex.value]
      isDragging.value = false
      activeIndex.value = -1
      if (!activeThumbRef?.isHovering) {
        nextTick(() => activeThumbRef?.hideTooltip())
      }

      off(window, 'mousemove', handleMouseMove)
      off(window, 'touchmove', handleMouseMove)
      off(window, 'mouseup', handleMouseUpOnDocument)
      off(window, 'touchend', handleMouseUpOnDocument)
      off(window, 'contextmenu', handleMouseUpOnDocument)
    }
  }

  function handleMouseMove(evt: MouseEvent | TouchEvent) {
    if (!isDragging.value) {
      stopDragging()
      return
    }

    const newValue = calcValueByMouseEvent(evt)
    updateModelValue(newValue)
    checkAcross(newValue)
  }

  function handleMouseUpOnDocument() {
    stopDragging()
  }

  function handleMouseUp() {
    const { value: index } = activeIndex
    if (index !== -1) {
      thumbListRef.value[index]?.thumbRef?.focus()
    }
  }

  function updateModelValue(newValue: number) {
    const { value: index } = activeIndex
    if (valuesRef.value[index] !== newValue) {
      const newValues = valuesRef.value.slice()
      newValues[index] = newValue
      const oldVal = toRaw(accessor.valueRef.value)
      const modelValue = props.range ? newValues : newValues[0]
      accessor.setValue(modelValue)

      callEmit(props.onChange, modelValue, oldVal)

      // sync position of thumb
      nextTick(() => setValues())
    }
  }

  function setActiveIndex(newValue: number) {
    const { value: oldValues } = valuesRef
    activeIndex.value = props.range
      ? Math.abs(oldValues[0] - newValue) < Math.abs(oldValues[1] - newValue)
        ? 0
        : 1
      : 0
  }

  function checkAcross(value: number) {
    if (props.range) {
      const { value: thumbValues } = valuesRef
      let newIndex = activeIndex.value
      if (value > thumbValues[1]) {
        newIndex = 1
      } else if (value < thumbValues[0]) {
        newIndex = 0
      }

      if (newIndex !== activeIndex.value) {
        activeIndex.value = newIndex
        thumbListRef.value[activeIndex.value]?.thumbRef?.focus()
      }
    }
  }

  function calcValueByMouseEvent(evt: MouseEvent | TouchEvent) {
    const client = getMouseClientXY(evt)
    const railRect = railRef.value!.getBoundingClientRect()
    let percentage: number
    if (props.vertical) {
      percentage = (railRect.bottom - client.clientY) / railRect.height
    } else {
      percentage = (client.clientX - railRect.left) / railRect.width
    }

    if (props.reverse) {
      percentage = 1 - percentage
    }

    return calcValueByStep(percentage * (props.max - props.min) + props.min)
  }

  function calcValueByStep(value: number) {
    value = Math.max(props.min, Math.min(props.max, value))
    const marks = props.marks ?? {}
    const points = Object.keys(marks).map(parseFloat)

    if (props.step !== null) {
      // convert to integer for calculation to ensure decimal accuracy
      const convertNum = Math.pow(10, precision.value)
      const totalSteps = Math.floor((props.max * convertNum - props.min * convertNum) / (props.step * convertNum))
      const steps = Math.min((value - props.min) / props.step, totalSteps)
      const closestStepValue = Math.round(steps) * props.step + props.min
      points.push(parseFloat(closestStepValue.toFixed(precision.value)))
    }

    const diffs = points.map(point => Math.abs(value - point))
    const index = diffs.indexOf(Math.min(...diffs))
    return points[index] ?? props.min
  }

  function incValueByActiveIndex(flag: number) {
    if (props.step !== null) {
      const step = flag < 0 ? -props.step : +props.step
      const currValue = valuesRef.value[activeIndex.value]
      return Math.max(props.min, Math.min(props.max, parseFloat((currValue + step).toFixed(stepPrecision.value))))
    }

    return props.min
  }

  watch(
    accessor.valueRef,
    (val, oldVal) => {
      if (isDragging.value || (Array.isArray(val) && Array.isArray(oldVal) && val.every((v, i) => v === oldVal[i]))) {
        return
      }
      setValues()
    },
    { immediate: true },
  )

  watch(
    () => [props.max, props.min, props.range, props.step],
    () => {
      setValues()
    },
  )

  function setValues() {
    if (props.min > props.max) {
      if (__DEV__) {
        Logger.error('components/slider', 'min should not be greater than max.')
      }
      return
    }

    if (__DEV__ && props.step !== null && props.step <= 0) {
      Logger.error('components/slider', `step(${props.step}) should be greater than 0.`)
    }

    const { value: modelValue = 0 } = accessor.valueRef
    let val: number[]
    if (props.range) {
      if (!Array.isArray(modelValue)) {
        if (__DEV__) {
          Logger.error('components/slider', 'value should be [number, number] in range mode.')
        }
        return
      }

      val = [modelValue[0] ?? props.min, modelValue[1] ?? props.min]
    } else {
      if (!isNumeric(modelValue)) {
        if (__DEV__) {
          Logger.error('components/slider', 'value should be a number.')
        }
        return
      }

      val = [modelValue as number]
    }

    valuesRef.value = val
      .map(num => {
        if (!isNumeric(num)) {
          return props.min
        }

        return calcValueByStep(num)
      })
      .sort((a, b) => a - b) // order
  }

  return {
    valuesRef,
    thumbListRef,
    railRef,
    direction,
    isDisabled,
    isDragging,
    focus,
    blur,
    setThumbRefs,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
    handleMarkClick,
  }
}
