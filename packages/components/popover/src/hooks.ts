import type { ComputedRef, WritableComputedRef } from 'vue'
import type { PopoverConfig } from '@idux/components/config'
import type { PopoverProps } from './types'

import { computed, getCurrentInstance } from 'vue'
import { useGlobalConfig } from '@idux/components/config'
import { callEmit } from '@idux/cdk/utils'

export function useConfig(): ComputedRef<PopoverConfig> {
  const config = useGlobalConfig('popover')
  const props = getCurrentInstance()!.props as PopoverProps

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
  const props = getCurrentInstance()!.props as PopoverProps

  return computed({
    get() {
      return props.visible
    },
    set(value: boolean) {
      callEmit(props['onUpdate:visible'], value)
    },
  })
}
