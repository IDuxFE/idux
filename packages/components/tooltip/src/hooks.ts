import type { ComputedRef, WritableComputedRef } from 'vue'
import type { TooltipConfig } from '@idux/components/config'
import type { TooltipProps } from './types'

import { computed, getCurrentInstance } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { callEmit } from '@idux/cdk/utils'

export function useConfig(): ComputedRef<TooltipConfig> {
  const config = useGlobalConfig('tooltip')
  const props = getCurrentInstance()!.props as TooltipProps

  return computed(() => {
    return {
      placement: props.placement ?? config.placement,
      trigger: props.trigger ?? config.trigger,
      showDelay: props.showDelay ?? config.showDelay,
      hideDelay: props.hideDelay ?? config.hideDelay,
      destroyOnHide: props.destroyOnHide ?? config.destroyOnHide,
      autoAdjust: props.autoAdjust ?? config.autoAdjust,
    }
  })
}

export function useVisibility(): WritableComputedRef<boolean> {
  const props = getCurrentInstance()!.props as TooltipProps

  return computed({
    get() {
      return !!props.visible
    },
    set(value) {
      callEmit(props['onUpdate:visible'], value)
    },
  })
}
