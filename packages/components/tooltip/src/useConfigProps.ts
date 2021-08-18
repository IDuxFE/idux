import type { ComputedRef } from 'vue'
import type { TooltipConfig } from '@idux/components/config'
import type { TooltipProps } from './types'

import { computed } from 'vue'

export function useConfigProps(
  props: TooltipProps,
  config: TooltipConfig,
): ComputedRef<TooltipConfig & { clickOutside: boolean }> {
  return computed(() => {
    const trigger = props.trigger ?? config.trigger
    return {
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
      clickOutside: trigger === 'click' || trigger === 'contextmenu',
      delay: props.delay ?? config.delay,
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      placement: props.placement ?? config.placement,
      target: props.target ?? config.target,
      trigger: trigger,
    }
  })
}
