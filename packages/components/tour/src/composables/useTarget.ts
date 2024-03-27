/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { ResolvedTourStep, TargetPositionInfo, TargetPositionOrigin } from '../types'

import { type ComputedRef, type Ref, onMounted, onUnmounted, shallowRef, watch } from 'vue'

import { isBoolean } from 'lodash-es'

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

  const getContainerPos = () => {
    const mask = activeStep.value?.mask
    if (isBoolean(mask) || !mask || !mask.container || mask.container === 'viewport') {
      return {
        containerX: 0,
        containerY: 0,
        containerWidth: window.innerWidth,
        containerHeight: window.innerHeight,
      }
    }

    const { x, y, width, height } = mask.container
    return {
      containerX: x,
      containerY: y,
      containerWidth: width,
      containerHeight: height,
    }
  }

  const getTargetPositionInfo = () => {
    const targetEl = targetRef.value
    const { offset = 0, radius = 0, outline = 0 } = activeStep.value?.gap ?? {}
    if (!targetEl) {
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        width: 0,
        height: 0,
        radius,
        outline,
      }
    }

    let { x, y, width, height } = targetEl.getBoundingClientRect()

    // enlarge offset by 1 when outline is provided
    // because outline should be painted right 1px outside of target rect
    const mergedOffset = offset + (outline ? outline + 1 : 0)

    if (mergedOffset) {
      x -= mergedOffset
      y -= mergedOffset
      width += mergedOffset * 2
      height += mergedOffset * 2
    }

    return {
      x,
      y,
      width,
      height,
      radius,
      outline,
    }
  }

  const updatePopsition = (scrollIntoView = false, origin: TargetPositionOrigin = 'index') => {
    const targetEl = targetRef.value

    const positionInfo = {
      ...getContainerPos(),
      ...getTargetPositionInfo(),
      origin,
    }

    if (!targetEl) {
      setPositionInfo(positionInfo)
      return
    }

    if (isInViewPort(targetEl)) {
      scrollIntoViewTarget = null
    } else if (scrollIntoView && targetEl !== scrollIntoViewTarget) {
      scrollIntoViewTarget = targetEl
      targetEl.scrollIntoView(mergedProps.value.scrollIntoViewOptions)
      return
    }

    setPositionInfo(positionInfo)
  }

  let stopResizeLisiten: (() => void) | undefined
  let stopScrollLisiten: (() => void) | undefined

  onMounted(() => {
    watch([() => activeStep.value?.target, visible], updateTarget, { immediate: true })
    watch(
      [targetRef, activeStep],
      ([target], [preTarget]) => updatePopsition(true, target !== preTarget ? 'index' : 'step-update'),
      { flush: 'post', immediate: true },
    )
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
