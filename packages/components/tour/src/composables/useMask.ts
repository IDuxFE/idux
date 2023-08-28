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
  maskAttrs: ComputedRef<SVGAttributes>
  maskClass: ComputedRef<string | undefined>
  maskStyle: ComputedRef<CSSProperties>
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
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const animateCbs = new Set<() => void>()

  const maskAttrs = computed(() => (positionInfo.value ? getMaskAttrs(positionInfo.value) : {}))

  const maskStyle = computed(() => {
    const { mask } = activeStep.value ?? {}

    return normalizeStyle({
      fill: isBoolean(mask) ? undefined : mask?.color,
      width: convertCssPixel(positionInfo.value?.windowWidth ?? window.innerWidth),
      height: convertCssPixel(positionInfo.value?.windowHeight ?? window.innerHeight),
      zIndex: currentZIndex.value,
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

      setMaskPath(
        getMaskPath({
          windowHeight: to.windowHeight,
          windowWidth: to.windowWidth,
          x: easeInOutQuad(elapsed, from.x, to.x - from.x, animateDuration),
          y: easeInOutQuad(elapsed, from.y, to.y - from.y, animateDuration),
          width: easeInOutQuad(elapsed, from.width, to.width - from.width, animateDuration),
          height: easeInOutQuad(elapsed, from.height, to.height - from.height, animateDuration),
          radius: easeInOutQuad(elapsed, from.radius, to.radius - from.radius, animateDuration),
        }),
      )

      if (elapsed < animateDuration) {
        rAFHandle = rAF(tick)
      } else {
        setMaskPath(getMaskPath(to))
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
        setMaskPath('')
      } else if (!mergedProps.value.animatable || pos?.origin !== 'index' || !prePos || !pos) {
        setMaskPath(getMaskPath(pos))

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
    maskAttrs,
    maskStyle,
    maskClass,
    isAnimating,
    onAnimateEnd,
  }
}

function getMaskPath(positionInfo: Omit<TargetPositionInfo, 'origin'> | null): string {
  const viewBoxRect = (width: number, height: number) => `M${width},0L0,0L0,${height}L${width},${height}L${width},0Z`

  if (!positionInfo) {
    return viewBoxRect(window.innerWidth, window.innerHeight)
  }

  const { windowWidth, windowHeight, x, y, width, height, radius } = positionInfo

  // prevent glitches when stage is too small for radius
  const limitedRadius = Math.min(radius, width / 2, height / 2)

  // no value below 0 allowed + round down
  const normalizedRadius = Math.floor(Math.max(limitedRadius, 0))

  const boxX = x + normalizedRadius
  const boxY = y
  const boxWidth = width - normalizedRadius * 2
  const boxHeight = height - normalizedRadius * 2

  const arch = (h: 1 | -1, v: 1 | -1) =>
    `a${normalizedRadius},${normalizedRadius} 0 0 1 ${h * normalizedRadius},${v * normalizedRadius}`

  /* eslint-disable indent */
  return `${viewBoxRect(windowWidth, windowHeight)}
    M${boxX},${boxY} h${boxWidth} ${arch(1, 1)} v${boxHeight} ${arch(-1, 1)} h-${boxWidth} ${arch(
      -1,
      -1,
    )} v-${boxHeight} ${arch(1, -1)} z`
  /* eslint-enable indent */
}

function getMaskAttrs(positionInfo: TargetPositionInfo): SVGAttributes {
  const { windowWidth, windowHeight } = positionInfo

  return {
    viewBox: `0 0 ${windowWidth} ${windowHeight}`,
    version: '1.1',
    preserveAspectRatio: 'xMinYMin slice',
  }
}
