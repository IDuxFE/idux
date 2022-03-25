/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipProps } from './types'
import type { ɵOverlayInstance, ɵOverlayProps } from '@idux/components/_private/overlay'
import type { TooltipConfig } from '@idux/components/config'
import type { ComputedRef, Ref } from 'vue'

import { computed, ref } from 'vue'

import { useControlledProp } from '@idux/cdk/utils'

const defaultOffset: [number, number] = [0, 12]

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
  const overlayProps = computed(() => {
    const trigger = props.trigger ?? config.trigger
    return {
      visible: visible.value,
      ['onUpdate:visible']: setVisible,
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
      clickOutside: trigger === 'click' || trigger === 'contextmenu',
      delay: props.delay ?? config.delay,
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      offset: defaultOffset,
      showArrow: true,
      placement: props.placement ?? config.placement,
      target: props.target ?? config.target ?? `${mergedPrefixCls.value}-container`,
      trigger: trigger,
      zIndex: props.zIndex,
    }
  })
  return { overlayRef, updatePopper, visible, setVisible, overlayProps }
}
