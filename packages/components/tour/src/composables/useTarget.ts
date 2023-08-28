/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { ResolvedTourStep, TargetPositionInfo, TargetPositionOrigin } from '../types'

import { type ComputedRef, type Ref, onMounted, onUnmounted, shallowRef, watch } from 'vue'

import { useEventListener, useState } from '@idux/cdk/utils'

import { isInViewPort } from '../utils'

export interface TargetContext {
  targetRef: Ref<HTMLElement | null>
  positionInfo: ComputedRef<TargetPositionInfo | null>
}

export function useTarget(
  mergedProps: ComputedRef<MergedTourProps>,
  activeStep: ComputedRef<ResolvedTourStep | undefined>,
  visible: ComputedRef<boolean>,
): TargetContext {
  const targetRef = shallowRef<HTMLElement | null>(null)
  const [positionInfo, setPositionInfo] = useState<TargetPositionInfo | null>(null)

  let scrollIntoViewTarget: HTMLElement | null = null

  const updateTarget = async () => {
    targetRef.value = (await activeStep.value?.target()) ?? null
  }

  const updatePopsition = (scrollIntoView = false, origin: TargetPositionOrigin = 'index') => {
    const targetEl = targetRef.value
    const { offset = 0, radius = 0 } = activeStep.value?.gap ?? {}

    if (!targetEl) {
      setPositionInfo({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: 0,
        height: 0,
        radius,
        origin,
      })
      return
    }

    if (isInViewPort(targetEl)) {
      scrollIntoViewTarget = null
    } else if (scrollIntoView && targetEl !== scrollIntoViewTarget) {
      scrollIntoViewTarget = targetEl
      targetEl.scrollIntoView(mergedProps.value.scrollIntoViewOptions)
      return
    }

    const { x, y, width, height } = targetEl.getBoundingClientRect()

    if (!offset) {
      setPositionInfo({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        x,
        y,
        width,
        height,
        radius,
        origin,
      })
    } else {
      setPositionInfo({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        x: x - offset,
        y: y - offset,
        width: width + offset * 2,
        height: height + offset * 2,
        radius,
        origin,
      })
    }
  }

  let stopResizeLisiten: (() => void) | undefined
  let stopScrollLisiten: (() => void) | undefined

  onMounted(() => {
    watch([() => activeStep.value?.target, visible], updateTarget, { immediate: true })
    watch(targetRef, () => updatePopsition(true, 'index'), { immediate: true })
    watch(visible, () => updatePopsition(true, 'visible'))
    watch(
      visible,
      v => {
        if (v) {
          stopResizeLisiten = useEventListener(window, 'resize', () => updatePopsition(false, 'resize'))
          stopScrollLisiten = useEventListener(window, 'scroll', () => updatePopsition(false, 'scroll'))
        } else {
          stopResizeLisiten?.()
          stopScrollLisiten?.()
        }
      },
      { immediate: true },
    )
  })

  onUnmounted(() => {
    stopResizeLisiten?.()
    stopScrollLisiten?.()
  })

  return {
    targetRef,
    positionInfo,
  }
}
