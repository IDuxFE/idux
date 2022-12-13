/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import { type ComputedRef, type Ref, computed, onDeactivated, ref } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'
import { type ɵOverlayInstance, type ɵOverlayProps } from '@idux/components/_private/overlay'
import { type TooltipConfig } from '@idux/components/config'

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
  mergedPrefixCls: ComputedRef<string>,
): TooltipOverlayContext {
  const overlayRef = ref<ɵOverlayInstance>()
  const updatePopper = () => overlayRef.value?.updatePopper()

  const [visible, setVisible] = useControlledProp(props, 'visible', false)

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
      container: props.overlayContainer ?? config.overlayContainer,
      containerFallback: `.${mergedPrefixCls.value}-overlay-container`,
      delay: props.delay ?? config.delay,
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      disabled: props.disabled,
      offset: props.offset ?? config.offset,
      showArrow: true,
      placement: props.placement ?? config.placement,
      trigger: trigger,
      zIndex: props.zIndex,
    }
  })
  return { overlayRef, updatePopper, visible, setVisible, overlayProps }
}
