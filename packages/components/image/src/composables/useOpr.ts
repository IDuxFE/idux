/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { GoType, ImageViewerProps, OprType, RotateType, ScaleType } from '../types'
import type { DebouncedFunc } from 'lodash-es'
import type { ComputedRef } from 'vue'

import { computed, ref, watchEffect } from 'vue'

import { debounce } from 'lodash-es'

import { useControlledProp } from '@idux/cdk/utils'

const debounceTime = 10
const defaultScale = 1
const defaultRotate = 0
const defaultScaleStep = 0.2
const defaultRotateStep = 90

interface ImgStyleOprContext {
  transformStyle: ComputedRef<{
    transform: string
  }>
  scaleDisabled: ComputedRef<{
    in: boolean
    out: boolean
  }>
  rotateHandle: DebouncedFunc<(direction?: RotateType, rotateStep?: number) => void>
  scaleHandle: DebouncedFunc<(direction: ScaleType, scaleStep?: number) => void>
  resetTransform: () => void
}

interface ImgSwitchContext {
  activeIndex: ComputedRef<number>
  switchDisabled: ComputedRef<{
    previous: boolean
    next: boolean
  }>
  switchVisible: ComputedRef<boolean>
  goHandle: DebouncedFunc<(direction?: GoType) => void>
}

export function useOprList(
  goHandle: DebouncedFunc<(direction?: GoType) => void>,
  rotateHandle: DebouncedFunc<(direction?: RotateType, rotateStep?: number) => void>,
  scaleHandle: DebouncedFunc<(direction: ScaleType, scaleStep?: number) => void>,
  setVisible: (value: boolean) => void,
  scaleDisabled: ComputedRef<Record<ScaleType, boolean>>,
  switchDisabled: ComputedRef<Record<GoType, boolean>>,
  switchVisible: ComputedRef<boolean>,
): ComputedRef<OprType[]> {
  const goNext = () => goHandle('next')
  const goPrevious = () => goHandle('previous')
  const rotateLeft = () => rotateHandle('left')
  const rotateRight = () => rotateHandle('right')
  const zoomOut = () => scaleHandle('out')
  const zoomIn = () => scaleHandle('in')
  const close = () => setVisible(false)

  return computed(() => [
    {
      key: 'goPrevious',
      icon: 'left',
      opr: goPrevious,
      disabled: switchDisabled.value.previous,
      visible: switchVisible.value,
    },
    { key: 'goNext', icon: 'right', opr: goNext, disabled: switchDisabled.value.next, visible: switchVisible.value },
    { key: 'rotateLeft', icon: 'rotate-left', opr: rotateLeft, visible: true },
    { key: 'rotateRight', icon: 'rotate-right', opr: rotateRight, visible: true },
    { key: 'zoomOut', icon: 'zoom-out', opr: zoomOut, disabled: scaleDisabled.value.out, visible: true },
    { key: 'zoomIn', icon: 'zoom-in', opr: zoomIn, disabled: scaleDisabled.value.in, visible: true },
    { key: 'close', icon: 'close', opr: close, visible: true },
  ])
}

export function useImgStyleOpr(zoom: ComputedRef<number[]>): ImgStyleOprContext {
  const scale = ref(defaultScale)
  const rotate = ref(defaultRotate)
  const rotateFactor = {
    left: -1,
    right: 1,
  } as const
  const scaleFactor = {
    in: 1,
    out: -1,
  } as const

  const initScale = computed(() => {
    const [zoomOut, zoomIn] = zoom.value
    if (zoomOut > defaultScale) {
      return zoomOut
    }
    if (zoomIn < defaultScale) {
      return zoomIn
    }
    return defaultScale
  })

  watchEffect(() => (scale.value = initScale.value))

  const scaleDisabled = computed(() => {
    const [zoomOut, zoomIn] = zoom.value

    return {
      in: scale.value >= zoomIn,
      out: scale.value <= zoomOut,
    }
  })

  const transformStyle = computed(() => ({ transform: `scale(${scale.value}) rotate(${rotate.value}deg)` }))

  const rotateHandle = debounce((direction: RotateType = 'left', rotateStep: number = defaultRotateStep) => {
    rotate.value = rotate.value + rotateStep * rotateFactor[direction]
  }, debounceTime)

  const scaleHandle = debounce((direction: ScaleType, scaleStep: number = defaultScaleStep) => {
    if (scaleDisabled.value[direction]) {
      return
    }
    scale.value = scale.value + scaleStep * scaleFactor[direction]
  }, debounceTime)

  const resetTransform = () => {
    scale.value = initScale.value
    rotate.value = defaultRotate
  }

  return {
    transformStyle,
    scaleDisabled,
    rotateHandle,
    scaleHandle,
    resetTransform,
  }
}

export function useImgSwitch(props: ImageViewerProps, loop: ComputedRef<boolean>): ImgSwitchContext {
  const [activeIndex, setIndex] = useControlledProp(props, 'activeIndex', 0)

  const switchDisabled = computed(() => ({
    previous: !loop.value && activeIndex.value === 0,
    next: !loop.value && activeIndex.value === props.images.length - 1,
  }))
  const switchVisible = computed(() => props.images.length > 1)
  const goHandle = debounce((direction: GoType = 'next') => {
    if (direction === 'next') {
      if (switchDisabled.value.next || switchDisabled.value.previous) {
        return
      }
      setIndex(activeIndex.value >= props.images.length - 1 ? 0 : activeIndex.value + 1)
      return
    }
    setIndex(activeIndex.value <= 0 ? props.images.length - 1 : activeIndex.value - 1)
  }, debounceTime)

  return {
    activeIndex,
    switchDisabled,
    switchVisible,
    goHandle,
  }
}
