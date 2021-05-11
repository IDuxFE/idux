import type { DefineComponent } from 'vue'
import type { OverlayPlacement, OverlayTrigger } from '@idux/cdk/overlay'

import { PropTypes } from '@idux/cdk/utils'

export interface TooltipProps {
  /**
   * title of popover
   */
  title?: string
  /**
   * alignment between trigger and popover
   */
  placement?: OverlayPlacement
  /**
   * visibility of popover
   */
  visible?: boolean
  /**
   * the way to toggle popover
   */
  trigger?: OverlayTrigger
  showDelay?: number
  hideDelay?: number
  /**
   * whether destroy when popover is hidden
   */
  destroyOnHide?: boolean
  /**
   * whether re-adjust when popover is be covered
   */
  autoAdjust?: boolean
}

export const tooltipPropsDef = {
  title: PropTypes.string,
  placement: PropTypes.oneOf([
    'topStart',
    'top',
    'topEnd',
    'rightStart',
    'right',
    'rightEnd',
    'bottomStart',
    'bottom',
    'bottomEnd',
    'leftStart',
    'left',
    'leftEnd',
  ] as const),
  visible: PropTypes.bool,
  trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'contextmenu', 'manual'] as const),
  hideDelay: PropTypes.number,
  showDelay: PropTypes.number,
  destroyOnHide: PropTypes.bool,
  autoAdjust: PropTypes.bool,
}

export type TooltipComponent = InstanceType<DefineComponent<TooltipProps>>
