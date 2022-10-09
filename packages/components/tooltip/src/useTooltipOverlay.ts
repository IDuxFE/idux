/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, onDeactivated, ref, toRef } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { type ɵOverlayInstance, type ɵOverlayProps } from '@idux/components/_private/overlay'
import { type CommonConfig, type TooltipConfig } from '@idux/components/config'
import { useOverlayContainer, useZIndex } from '@idux/components/utils'

import { type TooltipProps } from './types'

export interface TooltipOverlayContext {
  overlayRef: Ref<ɵOverlayInstance | undefined>
  updatePopper: () => void | undefined
  visible: ComputedRef<boolean>
  setVisible: (value: boolean) => void
  overlayProps: ComputedRef<ɵOverlayProps>
}

export function useTooltipOverlay(
  props: TooltipProps,
  config: TooltipConfig,
  common: CommonConfig,
  mergedPrefixCls: ComputedRef<string>,
): TooltipOverlayContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const updatePopper = () => overlayRef.value?.updatePopper()

  const mergedOverlayContainer = useOverlayContainer(props, config, common, mergedPrefixCls)

  const [visible, setVisible] = useControlledProp(props, 'visible', false)
  const { currentZIndex } = useZIndex(toRef(props, 'zIndex'), toRef(common, 'overlayZIndex'), visible)

  onDeactivated(() => {
    if (visible.value && props.closeOnDeactivated) {
      setVisible(false)
    }
  })

  const overlayProps = computed(() => {
    const trigger = props.trigger ?? config.trigger
    return {
      visible: visible.value,
      ['onUpdate:visible']: setVisible,
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
      clickOutside: trigger === 'click' || trigger === 'contextmenu',
      container: mergedOverlayContainer.value,
      delay: props.delay ?? config.delay,
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      offset: props.offset ?? config.offset,
      showArrow: true,
      placement: props.placement ?? config.placement,
      trigger: trigger,
      zIndex: currentZIndex.value,
    }
  })
  return { overlayRef, updatePopper, visible, setVisible, overlayProps }
}
