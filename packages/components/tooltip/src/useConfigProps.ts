/**
 * @license
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/IDuxFE/idux/blob/main/LICENSE
 */

import type { TooltipProps } from './types'
import type { TooltipConfig } from '@idux/components/config'
import type { ComputedRef } from 'vue'

import { computed } from 'vue'

export function useConfigProps(
  props: TooltipProps,
  config: TooltipConfig,
  setVisibility: (visible: boolean) => void,
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
      ['onUpdate:visible']: setVisibility,
    }
  })
}
