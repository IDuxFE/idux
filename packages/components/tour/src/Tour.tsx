/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { Transition, computed, defineComponent, provide, toRef } from 'vue'

import { CdkPortal } from '@idux/cdk/portal'
import { convertCssPixel } from '@idux/cdk/utils'
import { ɵOverlay } from '@idux/components/_private/overlay'
import { useGlobalConfig } from '@idux/components/config'
import { useZIndex } from '@idux/components/utils'

import Mask from './Mask'
import Panel from './Panel'
import { useActiveState } from './composables/useActiveState'
import { useActiveStep } from './composables/useActiveStep'
import { useCloseTrigger } from './composables/useCloseTrigger'
import { useMask } from './composables/useMask'
import { useMergedProps } from './composables/useMergedProps'
import { useOverlayProps } from './composables/useOverlayProps'
import { useStepChange } from './composables/useStepChange'
import { useTarget } from './composables/useTarget'
import { useVisible } from './composables/useVisible'
import { tourToken } from './token'
import { tourProps } from './types'

export default defineComponent({
  name: 'IxTour',
  props: tourProps,
  setup(props, { slots }) {
    const common = useGlobalConfig('common')
    const config = useGlobalConfig('tour')
    const locale = useGlobalConfig('locale')

    const mergedPrefixCls = computed(() => `${common.prefixCls}-tour`)

    const mergedProps = useMergedProps(props, config)
    const visibleContext = useVisible(props)
    const activeStateContext = useActiveState(props, visibleContext)

    const { visible, setVisible } = visibleContext
    const { activeIndex, isCurrentMax } = activeStateContext
    const activeStep = useActiveStep(mergedProps, activeIndex, isCurrentMax, locale.tour)
    const { positionInfo } = useTarget(mergedProps, activeStep, visible)
    const currentZIndex = useZIndex(toRef(props, 'zIndex'), toRef(common, 'overlayZIndex'), visible)

    const maskContext = useMask(mergedProps, activeStep, activeIndex, positionInfo, visible, currentZIndex)
    const { onAnimateEnd } = maskContext

    useCloseTrigger(mergedProps, positionInfo, visible, setVisible)
    const stepChangeContext = useStepChange(mergedProps, activeIndex, activeStep, visible, onAnimateEnd)
    const { isStepChanging } = stepChangeContext

    const mergedContainerFallback = computed(() => `.${mergedPrefixCls.value}-overlay-container`)
    const mergedContainer = computed(() => mergedProps.value.overlayContainer ?? mergedContainerFallback.value)

    const overlayProps = useOverlayProps(
      common,
      mergedContainerFallback,
      mergedProps,
      activeStep,
      isStepChanging,
      visible,
      currentZIndex,
    )

    const placeholderStyle = computed(() => {
      if (!positionInfo.value) {
        return
      }

      const { x, y, width, height } = positionInfo.value

      return {
        top: convertCssPixel(y),
        left: convertCssPixel(x),
        width: convertCssPixel(width),
        height: convertCssPixel(height),
      }
    })

    provide(tourToken, {
      mergedPrefixCls,
      mergedProps,
      locale: locale.tour,
      activeStep,
      ...activeStateContext,
      ...maskContext,
      ...visibleContext,
      ...stepChangeContext,
    })

    return () => {
      const prefixCls = mergedPrefixCls.value

      const overlaySlots = {
        default: () => <div class={`${prefixCls}-placeholder`} style={placeholderStyle.value}></div>,
        content: () => <Panel v-slots={slots} />,
      }

      return (
        <>
          <CdkPortal target={mergedContainer.value} load={visible.value}>
            <Transition name={mergedProps.value.animatable ? `${common.prefixCls}-fade-fast` : undefined}>
              <Mask v-show={visible.value && !!activeStep.value?.mask} />
            </Transition>
          </CdkPortal>
          <ɵOverlay class={`${prefixCls}-overlay`} {...overlayProps.value} v-slots={overlaySlots} />
        </>
      )
    }
  },
})
