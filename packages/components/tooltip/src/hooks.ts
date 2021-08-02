import type { ComputedRef, WritableComputedRef } from 'vue'
import type { TooltipConfig } from '@idux/components/config'
import type { TooltipProps } from './types'

import { computed } from 'vue'
import { callEmit } from '@idux/cdk/utils'

export function useConfigProps(props: TooltipProps, config: TooltipConfig): ComputedRef<TooltipConfig> {
  return computed(() => {
    return {
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
      delay: props.delay ?? config.delay,
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      placement: props.placement ?? config.placement,
      target: props.target ?? config.target,
      trigger: props.trigger ?? config.trigger,
    }
  })
}

export function useVisibility(props: TooltipProps): WritableComputedRef<boolean> {
  return computed({
    get() {
      return props.visible
    },
    set(value) {
      callEmit(props['onUpdate:visible'], value)
    },
  })
}
