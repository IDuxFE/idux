import type { OverlayOptions } from '@idux/cdk/overlay'
import type { GlobalConfigKey } from '@idux/components/core/config'
import type { TooltipProps } from './types'

import { getCurrentInstance } from 'vue'
import { useGlobalConfig } from '@idux/components/core/config'

export function useOverlayOptions(comp: Extract<'tooltip', GlobalConfigKey> = 'tooltip'): OverlayOptions {
  const props: TooltipProps = getCurrentInstance()!.props
  const config = useGlobalConfig(comp)

  return {
    visible: props.visible,
    scrollStrategy: 'reposition',
    showArrow: true,
    placement: props.placement ?? config.placement,
    trigger: props.trigger ?? config.trigger,
    allowEnter: true,
    offset: [0, 5],
    hideDelay: props.hideDelay ?? config.hideDelay,
    showDelay: props.showDelay ?? config.showDelay,
  }
}
