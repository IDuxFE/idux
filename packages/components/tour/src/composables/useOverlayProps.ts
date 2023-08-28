/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { MergedTourProps } from './useMergedProps'
import type { ResolvedTourStep } from '../types'
import type { ɵOverlayProps } from '@idux/components/_private/overlay'
import type { CommonConfig } from '@idux/components/config'

import { type ComputedRef, computed, ref } from 'vue'

export function useOverlayProps(
  componentCommonConfig: CommonConfig,
  containerFallback: ComputedRef<string>,
  mergedProps: ComputedRef<MergedTourProps>,
  activeStep: ComputedRef<ResolvedTourStep | undefined>,
  isStepChanging: ComputedRef<boolean>,
  visible: ComputedRef<boolean>,
  currentZIndex: ComputedRef<number>,
  onStepChange: (cb: () => void) => void,
): ComputedRef<ɵOverlayProps> {
  const currentActiveStep = ref(activeStep.value)

  onStepChange(() => {
    currentActiveStep.value = activeStep.value
  })

  return computed(() => {
    const { animatable, overlayContainer, offset } = mergedProps.value
    const { placement = 'bottomStart', showArrow } = currentActiveStep.value ?? {}

    return {
      visible: visible.value && !!currentActiveStep.value && !isStepChanging.value,
      container: overlayContainer,
      containerFallback: containerFallback.value,
      trigger: 'manual',
      placement,
      showArrow,
      delay: 0,
      transitionName: animatable ? `${componentCommonConfig.prefixCls}-fade-fast` : undefined,
      offset,
      zIndex: currentZIndex.value,
    }
  })
}
