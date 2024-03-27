/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { ResolvedTourStep, TargetPositionInfo } from '../types'

import {
  type CSSProperties,
  type ComputedRef,
  type SVGAttributes,
  computed,
  normalizeStyle,
  onUnmounted,
  watch,
} from 'vue'

import { isBoolean } from 'lodash-es'

import { cancelRAF, convertCssPixel, rAF, useState } from '@idux/cdk/utils'

import { easeInOutQuad } from '../utils'

const animateDuration = 200

export interface MaskContext {
  maskPath: ComputedRef<string>
  maskOutlinePath: ComputedRef<string | undefined>
  maskAttrs: ComputedRef<SVGAttributes>
  maskClass: ComputedRef<string | undefined>
  maskStyle: ComputedRef<CSSProperties>
  maskOutlineStyle: ComputedRef<CSSProperties>
  isAnimating: ComputedRef<boolean>
  onAnimateEnd: (cb: () => void) => void
}

export function useMask(
  mergedProps: ComputedRef<MergedTourProps>,
  activeStep: ComputedRef<ResolvedTourStep | undefined>,
  activeIndex: ComputedRef<number>,
  positionInfo: ComputedRef<TargetPositionInfo | null>,
  visible: ComputedRef<boolean>,
  currentZIndex: ComputedRef<number>,
): MaskContext {
  const [maskPath, setMaskPath] = useState<string>('')
  const [maskOutlinePath, setMaskOutlinePath] = useState<string | undefined>(undefined)

  const updateMask = (positionInfo: Omit<TargetPositionInfo, 'origin'> | null | false) => {
    if (positionInfo === false) {
      setMaskPath('')
      setMaskOutlinePath(undefined)
    } else {
      setMaskPath(getMaskPath(positionInfo))
      setMaskOutlinePath(getMaskOutlinePath(positionInfo))
    }
  }

  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const animateCbs = new Set<() => void>()

  const maskAttrs = computed(() => (positionInfo.value ? getMaskAttrs() : {}))

  const maskStyle = computed(() => {
    const { mask } = activeStep.value ?? {}

    return normalizeStyle({
      fill: isBoolean(mask) ? undefined : mask?.color,
      width: convertCssPixel(window.innerWidth),
      height: convertCssPixel(window.innerHeight),
      zIndex: currentZIndex.value,
    }) as CSSProperties
  })
  const maskOutlineStyle = computed(() => {
    const { mask } = activeStep.value ?? {}

    return normalizeStyle({
      fill: isBoolean(mask) ? undefined : mask?.outlineColor,
    }) as CSSProperties
  })
  const maskClass = computed(() => {
    const { mask } = activeStep.value ?? {}

    return isBoolean(mask) ? undefined : mask?.class
  })

  const onAnimateEnd = (cb: () => void) => {
    animateCbs.add(cb)
  }
  const runAnimateCbs = () => {
    animateCbs.forEach(cb => cb())
  }
  onUnmounted(() => {
    animateCbs.clear()
  })

  let rAFHandle: number

  const cancelAnimate = () => {
    cancelRAF(rAFHandle)
    setIsAnimating(false)
  }

  const animate = (from: TargetPositionInfo, to: TargetPositionInfo) => {
    const start = Date.now()
    setIsAnimating(true)

    const tick = () => {
      const elapsed = Date.now() - start

      const currentTickPos = {
        containerWidth: to.containerWidth,
        containerHeight: to.containerHeight,
        containerX: to.containerX,
        containerY: to.containerY,
        x: easeInOutQuad(elapsed, from.x, to.x - from.x, animateDuration),
        y: easeInOutQuad(elapsed, from.y, to.y - from.y, animateDuration),
        width: easeInOutQuad(elapsed, from.width, to.width - from.width, animateDuration),
        height: easeInOutQuad(elapsed, from.height, to.height - from.height, animateDuration),
        radius: easeInOutQuad(elapsed, from.radius, to.radius - from.radius, animateDuration),
        outline: to.outline,
      }

      updateMask(currentTickPos)

      if (elapsed < animateDuration) {
        rAFHandle = rAF(tick)
      } else {
        updateMask(to)
        setIsAnimating(false)
        runAnimateCbs()
      }
    }

    rAFHandle = rAF(tick)
  }

  let _tempIndex = activeIndex.value
  watch(
    positionInfo,
    (pos, prePos) => {
      if (!visible.value) {
        _tempIndex = activeIndex.value
        return
      }

      if (!activeStep.value?.mask) {
        cancelAnimate()
        updateMask(false)
      } else if (!mergedProps.value.animatable || pos?.origin !== 'index' || !prePos || !pos) {
        updateMask(pos)

        if (mergedProps.value.animatable && (isAnimating.value || activeIndex.value !== _tempIndex)) {
          runAnimateCbs()
        }

        cancelAnimate()
      } else {
        cancelAnimate()
        animate(prePos, pos)
      }

      _tempIndex = activeIndex.value
    },
    {
      flush: 'post',
    },
  )

  return {
    maskPath,
    maskOutlinePath,
    maskAttrs,
    maskStyle,
    maskOutlineStyle,
    maskClass,
    isAnimating,
    onAnimateEnd,
  }
}

function arch(h: 1 | -1, v: 1 | -1, radius: number) {
  return `a${radius},${radius} 0 0 1 ${h * radius},${v * radius}`
}
function drawRect(x: number, y: number, width: number, height: number, radius: number = 0) {
  // prevent glitches when stage is too small for radius
  const limitedRadius = Math.min(radius, width / 2, height / 2)

  // no value below 0 allowed + round down
  const normalizedRadius = Math.floor(Math.max(limitedRadius, 0))

  const boxX = x + normalizedRadius
  const boxY = y
  const boxWidth = width - normalizedRadius * 2
  const boxHeight = height - normalizedRadius * 2

  return `M${boxX},${boxY} h${boxWidth} ${arch(1, 1, normalizedRadius)} v${boxHeight} ${arch(-1, 1, normalizedRadius)} h-${boxWidth} ${arch(
    -1,
    -1,
    normalizedRadius,
  )} v-${boxHeight} ${arch(1, -1, normalizedRadius)} z`
}

function getMaskPath(positionInfo: Omit<TargetPositionInfo, 'origin'> | null): string {
  if (!positionInfo) {
    return drawRect(0, 0, window.innerWidth, window.innerHeight, 0)
  }

  const { containerX, containerY, containerWidth, containerHeight, x, y, width, height, radius } = positionInfo

  return `${drawRect(containerX, containerY, containerWidth, containerHeight)}${drawRect(x, y, width, height, radius)}`
}

function getMaskOutlinePath(positionInfo: Omit<TargetPositionInfo, 'origin'> | null): string | undefined {
  if (!positionInfo || !positionInfo.outline) {
    return
  }

  const { x, y, width, height, radius, outline } = positionInfo

  return `${drawRect(x - 1, y - 1, width + 2, height + 2, radius)}${drawRect(x + outline, y + outline, width - outline * 2, height - outline * 2, radius)}`
}

function getMaskAttrs(): SVGAttributes {
  return {
    viewBox: `0 0 ${window.innerWidth} ${window.innerHeight}`,
    version: '1.1',
    preserveAspectRatio: 'xMinYMin slice',
  }
}
