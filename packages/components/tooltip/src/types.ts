import type { DefineComponent } from 'vue'
import type { Placement } from '@popperjs/core'
import type { OverlayTrigger } from '@idux/cdk/overlay'

export interface TooltipProps {
  /**
   * title of popover
   */
  title?: string
  /**
   * alignment between trigger and popover
   */
  placement?: Placement
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

export type TooltipComponent = InstanceType<DefineComponent<TooltipProps>>
